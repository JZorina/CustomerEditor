import React, { useEffect } from 'react';
import { Button, MenuItem } from '@mui/material';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer } from '../../Models/Customer';
import { GenericEntityModel } from '../../Models/Generics';
import { useExternalData } from '../../Provider/ExternalDataProvider';
import './CustomerEditor.css';
import { words } from '../../Utils/Theme/Languages/En';
import { validateAmericanEIN } from '../../Utils/Validators';
import BasicInput from '../../Components/BasicInput/BasicInput';
import BasicSelect from '../../Components/BasicSelect/BasicSelect';
import { customerApiService } from '../../Apis/CustomerApiService';

export default function CustomerEditor() {
  let navigate = useNavigate();
  let { userId } = useParams();
  const { externalCountries, externalCurrencies } = useExternalData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Customer>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      currency: '',
      country: '',
    },
  });

  const formResult = useWatch({ control });

  const {
    general: { backButtonContent, notValid },
    editorPage: { currencyLabel, countryLabel, create, edit },
    validations: { requiredField, FifteenMaxLength, tenMaxLength },
    errorMessages: { format },
    placeHolders: { phone, e_mail },
  } = words;

  useEffect(() => {
    userId && customerApiService.getCustomerById(userId).then(reset);
  }, [userId]);

  const onSubmit: SubmitHandler<Customer> = async (data) => {
    userId
      ? await customerApiService.editCustomerById(data)
      : await customerApiService.addCustomer(data);
    goBack();
  };

  const isEIN = () => {
    let { EIN, state } = formResult;
    return EIN && state
      ? validateAmericanEIN(EIN.toString(), state)
        ? undefined
        : notValid
      : undefined;
  };

  const updateCountry = (e: any) => {
    setValue('country', e.target.value);
    let prefix = externalCountries?.filter(
      (i: GenericEntityModel) => i.value == e.target.value,
    );
    if (prefix) {
      setValue('phoneNumberPrefix', prefix[0]?.prefix);
      !formResult.phoneNumber
        ? setValue('phoneNumber', prefix[0]?.prefix)
        : null;
    }
  };

  const updateCurrency = (e: any) => {
    setValue('currency', e.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderCurrencyItems = () => {
    return externalCurrencies?.map((element: GenericEntityModel) => {
      return (
        <MenuItem value={element.value} key={element.id}>
          {`${element.symbol} - ${element.value}`}
        </MenuItem>
      );
    });
  };

  const renderCountryItems = () => {
    return externalCountries?.map((element: GenericEntityModel) => {
      return (
        <MenuItem value={element.value} key={element.id}>
          <>
            <img
              src={element.symbol}
              srcSet={element.symbol}
              alt={element.value}
              loading="lazy"
            />
            {element.value}
          </>
        </MenuItem>
      );
    });
  };

  return (
    <div className="mainEditorContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicInput
          type="text"
          placeholder="Name"
          {...register('name', {
            required: requiredField,
          })}
          errors={errors.name}
        />

        <BasicInput
          type="text"
          placeholder={e_mail}
          {...register('email', {
            required: requiredField,
            pattern: {
              value: /^\S+@\S+$/i,
              message: format,
            },
          })}
          errors={errors.email}
        />

        <BasicSelect
          {...register('currency', {
            required: requiredField,
          })}
          id="currency"
          label={currencyLabel}
          errors={errors.currency}
          renderItems={renderCurrencyItems}
          onChange={updateCurrency}
          defaultValue={formResult.currency}
        />

        <BasicSelect
          id="country"
          label={countryLabel}
          {...register('country', { required: requiredField })}
          errors={errors.country}
          renderItems={renderCountryItems}
          onChange={updateCountry}
          defaultValue={formResult.country}
        />

        <BasicInput type="text" placeholder="state" {...register('state')} />

        <BasicInput
          type="tel"
          placeholder={phone}
          {...register('phoneNumber', {
            required: requiredField,
            maxLength: { value: 15, message: FifteenMaxLength },
          })}
          errors={errors.phoneNumber}
        />

        <BasicInput
          type="text"
          placeholder="EIN"
          {...register('EIN', {
            maxLength: { value: 10, message: tenMaxLength },
            pattern: {
              value: /^\d{2}\-?\d{7}$/i,
              message: format,
            },
            validate: isEIN,
          })}
          errors={errors.EIN}
        />
        <Button className="submitButton" variant="contained" type="submit">
          {userId ? edit : create}
        </Button>
      </form>
      <Button variant="outlined" onClick={goBack}>
        {backButtonContent}
      </Button>
    </div>
  );
}
