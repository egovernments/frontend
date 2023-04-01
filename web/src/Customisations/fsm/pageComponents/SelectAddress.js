import React, { useEffect, useState } from "react";
import {
  FormStep,
  CardLabel,
  Dropdown,
  RadioButtons,
  LabelFieldPair,
  RadioOrSelect,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../components/TLTimelineInFSM";

const Digit = window.Digit;

const SelectAddress = ({ t, config, onSelect, userType, formData }) => {
  const allCities = Digit.Hooks.fsm.useTenants();
  let tenantId = Digit.ULBService.getCurrentTenantId();

  const inputs = [
    {
      active: true,
      code: "WITHIN_ULB_LIMITS",
      i18nKey: "WITHIN_ULB_LIMITS",
      name: "Witnin ULB Limits",
    },
    {
      active: true,
      code: "FROM_GRAM_PANCHAYAT",
      i18nKey: "FROM_GRAM_PANCHAYAT",
      name: "From Gram Panchayat",
    },
  ];

  const { pincode, city } = formData?.address || "";
  const cities =
    userType === "employee"
      ? allCities.filter((city) => city.code === tenantId)
      : pincode
      ? allCities.filter((city) => city?.pincode?.some((pin) => pin == pincode))
      : allCities;

  const [selectedCity, setSelectedCity] = useState(
    () =>
      formData?.address?.city ||
      Digit.SessionStorage.get("fsm.file.address.city") ||
      null
  );
  const [selectLocation, setSelectLocation] = useState(inputs[0]);
  const [localities, setLocalities] = useState();
  const [selectedLocality, setSelectedLocality] = useState();

  useEffect(() => {
    if (cities) {
      if (cities.length === 1) {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCity && selectLocation) {
      if (userType === "employee") {
        onSelect(config.key, {
          ...formData[config.key],
          city: selectedCity,
          propertyLocation: selectLocation,
        });
      }
    }
  }, [selectedCity, selectLocation]);

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    Digit.SessionStorage.set("fsm.file.address.city", city);
    setSelectedCity(city);
  }

  function selectedValue(value) {
    setSelectLocation(value);
    if (userType === "employee") {
      onSelect(config.key, {
        ...formData[config.key],
        propertyLocation: value,
      });
    }
  }

  function onSubmit() {
    onSelect(config.key, {
      city: selectedCity,
      propertyLocation: selectLocation,
    });
  }

  if (userType === "employee") {
    return (
      <div>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">
            {t("MYCITY_CODE_LABEL")}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <Dropdown
            className="form-field"
            isMandatory
            selected={cities?.length === 1 ? cities[0] : selectedCity}
            disable={cities?.length === 1}
            option={cities}
            select={selectCity}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel>{`${t("CS_PROPERTY_LOCATION")} *`}</CardLabel>
          <div className="field">
            <RadioButtons
              selectedOption={selectLocation}
              onSelect={selectedValue}
              style={{ display: "flex", marginBottom: 0 }}
              innerStyles={{ marginLeft: "10px" }}
              options={inputs}
              optionsKey="i18nKey"
              // disabled={editScreen}
            />
          </div>
        </LabelFieldPair>
      </div>
    );
  }
  return (
    <React.Fragment>
      <Timeline currentStep={1} flow="APPLY" />
      <FormStep
        config={config}
        onSelect={onSubmit}
        t={t}
        isDisabled={selectLocation ? false : true}
      >
        <CardLabel>{`${t("MYCITY_CODE_LABEL")} *`}</CardLabel>
        <RadioOrSelect
          options={cities}
          selectedOption={selectedCity}
          optionKey="i18nKey"
          onSelect={selectCity}
          t={t}
        />
        <CardLabel>{`${t("CS_PROPERTY_LOCATION")} *`}</CardLabel>
        <RadioOrSelect
          isMandatory={config.isMandatory}
          options={inputs}
          selectedOption={selectLocation}
          optionKey="i18nKey"
          onSelect={selectedValue}
          t={t}
        />
      </FormStep>
    </React.Fragment>
  );
};

export default SelectAddress;
