import { CardLabel, Dropdown, FormStep, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Timeline from "../components/TLTimelineInFSM";

const SelectLocalityOrGramPanchayat = ({ t, config, onSelect, userType, formData, formState }) => {
  const allCities = Digit.Hooks.fsm.useTenants();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  const { pincode, city, propertyLocation } = formData?.address || "";
  const cities =
    userType === "employee"
      ? allCities.filter((city) => city.code === tenantId)
      : pincode
      ? allCities.filter((city) => city?.pincode?.some((pin) => pin == pincode))
      : allCities;
  const [selectedLocality, setSelectedLocality] = useState();
  const [localities, setLocalities] = useState();
  const [gramPanchayats, setGramPanchayats] = useState();
  const [selectedGp, setSelectedGp] = useState();
  const [villages, setVillages] = useState();
  const [selectedVillage, setSelectedVillage] = useState();

  const [selectedCity, setSelectedCity] = useState(() => formData?.address?.city || Digit.SessionStorage.get("fsm.file.address.city") || null);
  useEffect(() => {
    if (cities) {
      if (cities.length === 1) {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);
  var { data: fetchedGramPanchayats } = Digit.Hooks.useBoundaryLocalities(
    selectedCity?.code,
    "gramPanchayats",
    {
      enabled: !!selectedCity,
    },
    t
  );

  var { data: fetchedLocalities } = Digit.Hooks.useBoundaryLocalities(
    selectedCity?.code,
    "revenue",
    {
      enabled: !!selectedCity,
    },
    t
  );

  useEffect(() => {
    if (selectedCity && fetchedLocalities) {
      let __localityList = fetchedLocalities;
      let filteredLocalityList = [];

      if (formData?.address?.locality) {
        setSelectedLocality(formData.address.locality);
      }

      if (formData?.address?.pincode) {
        filteredLocalityList = __localityList.filter((obj) => obj.pincode?.find((item) => item == formData.address.pincode));
        if (!formData?.address?.locality) setSelectedLocality();
      }
      setLocalities(() => (filteredLocalityList.length > 0 ? filteredLocalityList : __localityList));

      if (filteredLocalityList.length === 1) {
        setSelectedLocality(filteredLocalityList[0]);
        if (userType === "employee") {
          onSelect(config.key, { ...formData[config.key], locality: filteredLocalityList[0] });
        }
      }
    }
  }, [selectedCity, fetchedLocalities, formData]);

  useEffect(() => {
    if (fetchedGramPanchayats) {
      if (fetchedGramPanchayats && fetchedGramPanchayats.length > 0) {
        setGramPanchayats(fetchedGramPanchayats);
      }
    }
  }, [fetchedGramPanchayats]);
  if (userType !== "employee" && propertyLocation?.code === "FROM_GRAM_PANCHAYAT") {
    config.texts.cardText = "CS_FILE_APPLICATION_PROPERTY_LOCATION_GRAM_PANCHAYAT_TEXT";
  }

  function selectLocality(locality) {
    setSelectedLocality(locality);
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], locality: locality });
    }
  }

  function selectGramPanchayat(value) {
    setSelectedGp(value);
    const filteredVillages = fetchedGramPanchayats.filter((items) => items.code === value.code)[0].children;
    const localitiesWithLocalizationKeys = filteredVillages.map((obj) => ({
      ...obj,
      i18nkey: tenantId.replace(".", "_").toUpperCase() + "_" + obj.code,
    }));
    if (localitiesWithLocalizationKeys.length > 0) {
      setVillages(localitiesWithLocalizationKeys);
    }
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], gramPanchayat: value });
    }
  }

  function selectVillage(value) {
    setSelectedVillage(value);
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], village: value });
    }
  }

  function onSubmit() {
    if (propertyLocation?.code === "FROM_GRAM_PANCHAYAT") {
      onSelect(config.key, { gramPanchayat: selectedGp, village: selectedVillage });
    } else {
      onSelect(config.key, { locality: selectedLocality });
    }
  }
  if (userType === "employee") {
    return (
      <div>
        {propertyLocation?.code === "FROM_GRAM_PANCHAYAT" ? (
          <div>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {t("CS_GRAM_PANCHAYAT")}
                {config.isMandatory ? " * " : null}
              </CardLabel>
              <Dropdown
                className="form-field"
                isMandatory
                selected={selectedGp}
                option={gramPanchayats}
                select={selectGramPanchayat}
                optionKey="i18nkey"
                t={t}
              />
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {t("CS_VILLAGE_NAME")}
                {config.isMandatory ? " * " : null}
              </CardLabel>
              <Dropdown
                className="form-field"
                isMandatory
                selected={selectedVillage}
                option={villages}
                select={selectVillage}
                optionKey="i18nkey"
                t={t}
              />
            </LabelFieldPair>
          </div>
        ) : (
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">
              {t("CS_CREATECOMPLAINT_MOHALLA")}
              {config.isMandatory ? " * " : null}
            </CardLabel>
            <Dropdown
              className="form-field"
              isMandatory
              selected={selectedLocality}
              option={fetchedLocalities}
              select={selectLocality}
              optionKey="i18nkey"
              t={t}
            />
          </LabelFieldPair>
        )}
      </div>
    );
  }
  return (
    <React.Fragment>
      <Timeline currentStep={1} flow="APPLY" />
      <FormStep config={config} onSelect={onSubmit} isDisabled={!selectedGp} t={t}>
        {propertyLocation?.code === "WITHIN_ULB_LIMITS" ? (
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">
              {`${t("CS_CREATECOMPLAINT_MOHALLA")} *`}
              {/* {config.isMandatory ? " * " : null} */}
            </CardLabel>
            <Dropdown
              className="form-field"
              isMandatory
              selected={selectedLocality}
              option={fetchedLocalities}
              select={selectLocality}
              optionKey="i18nkey"
              t={t}
            />
          </LabelFieldPair>
        ) : (
          <div>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {`${t("CS_GRAM_PANCHAYAT")} *`}
                {/* {config.isMandatory ? " * " : null} */}
              </CardLabel>
              <Dropdown
                className="form-field"
                isMandatory
                selected={selectedGp}
                option={gramPanchayats}
                select={selectGramPanchayat}
                optionKey="i18nkey"
                t={t}
              />
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {`${t("CS_VILLAGE_NAME")} *`}
                {/* {config.isMandatory ? " * " : null} */}
              </CardLabel>
              <Dropdown
                className="form-field"
                isMandatory
                selected={selectedVillage}
                option={villages}
                select={selectVillage}
                optionKey="i18nkey"
                t={t}
              />
            </LabelFieldPair>
          </div>
        )}
      </FormStep>
    </React.Fragment>
  );
};

export default SelectLocalityOrGramPanchayat;
