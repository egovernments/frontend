export const getPropertyTypeLocale = (value) => {
  return `PROPERTYTYPE_MASTERS_${value?.split(".")[0]}`;
};

export const getPropertySubtypeLocale = (value) => `PROPERTYTYPE_MASTERS_${value}`;

export const getVehicleType = (vehicle, t) => {
  return (vehicle?.i18nKey && vehicle?.capacity && `${t(vehicle.i18nKey)} - ${vehicle.capacity} ${t("CS_COMMON_CAPACITY_LTRS")}`) || null;
};

export const updateConfiguration = ({ config, defaultConfig, detailsConfig, customConfiguration, isDefaultConfig }) => {
  const fieldSectionNamesInsideConfig = [];
  const detailsConfigCopy = { ...detailsConfig };

  customConfiguration.forEach((detail) => {
    // Adding custom fields to FieldSection fields array (body)
    if (detailsConfigCopy[detail.name] && detail.addFields) {
      detailsConfigCopy[detail.name].body.push(...detail.addFields);
    }

    let body = [];

    // adding fields to body array
    if (detail?.fieldsOrder?.length > 0) {
      // fields order
      detail.fieldsOrder.forEach((fieldName) => {
        if (detailsConfigCopy[detail.name]) {
          body.push(detailsConfigCopy[detail.name].body.find((value) => value.name === fieldName));
        }
      });

      // adding remaining fields to the body array which are not in detail?.fieldsOrder
      if (detail?.allFields) {
        detailsConfigCopy[detail.name]?.body?.forEach((field) => {
          if (!detail?.fieldsOrder?.includes(field.name)) {
            body.push(detailsConfigCopy[detail.name].body.find((value) => value.name === field.name));
          }
        });
      }
    } else {
      body = detailsConfigCopy[detail.name].body;
    }

    // remove fields
    if (detail?.removeFields) {
      detail?.removeFields?.forEach((fieldName) => {
        body = body.filter((field) => field.name !== fieldName);
      });
    }

    // adding FieldSection to config
    if (detailsConfigCopy[detail.name]) {
      config.push({
        head: detailsConfigCopy[detail.name].head,
        body,
      });
      fieldSectionNamesInsideConfig.push(detail.name);
    }
  });

  // adding remaining FieldSection to config
  if (isDefaultConfig) {
    defaultConfig?.forEach((fieldSectionName) => {
      if (!fieldSectionNamesInsideConfig.includes(fieldSectionName) && detailsConfigCopy[fieldSectionName]) {
        config.push(detailsConfigCopy[fieldSectionName]);
        fieldSectionNamesInsideConfig.push(fieldSectionName);
      }
    });
  }
};
