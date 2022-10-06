import React from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { addCustomer, editCustomerById, getCustomerById } from '../../Apis/Api';
import { Customer } from '../../Models/Customer';
import { GenericEntityModel } from '../../Models/Generics';
import { useExternalData } from '../../Provider/ExternalDataProvider';
import 'react-phone-input-2/lib/material.css';
import './CustomerEditor.css';
import { words } from '../../Utils/Theme/Languages/En';
import { validateAmericanEIN } from '../../Utils/Functions';

export default function CustomerEditor() {
  const navigate = useNavigate();

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
  });
  let { userId } = useParams();

  const {
    general: { backButtonContent },
    editorPage: { currencyLabel, countryLabel },
  } = words;

  const formResult = useWatch({ control });

  const onSubmit: SubmitHandler<Customer> = async (data) => {
    userId ? await editCustomerById(data) : await addCustomer(data);
    goBack();
  };

  const isEIN = () => {
    const { EIN, state, country } = formResult;
    return country == 'USA' && EIN && state
      ? validateAmericanEIN(EIN.toString(), state)
      : false;
  };

  React.useEffect(() => {
    if (userId) fetchCustomer(Number(userId));
  }, [userId]);

  const fetchCustomer = async (userId: number) => {
    getCustomerById(userId).then((res) => {
      reset(res);
    });
  };

  const updateCountry = (e: any) => {
    setValue('country', e.target.value);
    let prefix = externalCountries?.filter(
      (i: GenericEntityModel) => i.value == e.target.value,
    );
    prefix ? setValue('phoneNumberPrefix', prefix[0]?.prefix) : null;
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="mainEditorContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <Input
            className="input"
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
              maxLength: 80,
            })}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>

        <div className="inputContainer">
          <Input
            className="input"
            type="text"
            placeholder="you@example.com"
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email not in correct format',
              },
            })}
          />
          {errors.email?.type === 'required' && <p>{errors.email?.message}</p>}
          {errors.email?.type === 'pattern' && <p>{errors.email?.message}</p>}
        </div>

        <FormControl fullWidth className="formControl">
          <InputLabel id="currency">{currencyLabel}</InputLabel>
          <Select
            labelId="currency"
            id="currency"
            {...register('currency', { required: 'Currency is required' })}
            label="currency"
            onChange={(e: any) => setValue('currency', e.target.value)}
          >
            {externalCurrencies?.map((element: GenericEntityModel) => (
              <MenuItem value={element.value} key={element.id}>
                {`${element.symbol} - ${element.value}`}
              </MenuItem>
            ))}
          </Select>
          {errors.currency && <p>{errors.currency?.message}</p>}
        </FormControl>

        <FormControl fullWidth className="formControl">
          <InputLabel id="country">{countryLabel}</InputLabel>
          <Select
            {...register('country', { required: 'Country is required' })}
            labelId="country"
            id="country"
            label="country"
            onChange={updateCountry}
          >
            {externalCountries?.map((element: GenericEntityModel) => (
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
            ))}
          </Select>
          {errors.country && <p>{errors.country?.message}</p>}
        </FormControl>

        <Input
          className="inputContainer"
          type="text"
          placeholder="state"
          {...register('state', { required: false })}
        />

        <div className="inputContainer">
          <Input
            className="input"
            type="tel"
            placeholder="Phone Number with no prefix"
            {...register('phoneNumber', {
              required: 'Phone is required',
              maxLength: { value: 15, message: 'Maximum length is 15' },
            })}
          />
          {errors.phoneNumber?.type === 'required' && (
            <p>{errors.phoneNumber?.message}</p>
          )}
          {errors.phoneNumber?.type === 'pattern' && (
            <p>{errors.phoneNumber?.message}</p>
          )}
        </div>

        <div className="inputContainer">
          <Input
            type="text"
            className="input"
            placeholder="EIN"
            {...register('EIN', {
              required: { value: true, message: 'EIN is required' },
              maxLength: { value: 10, message: 'Maximum length is 10' },
              pattern: {
                value: /^\d{2}\-?\d{7}$/i,
                message: 'EIN not in correct format',
              },
              validate: isEIN,
            })}
          />
          {errors.EIN?.type === 'required' && <p>{errors.EIN?.message}</p>}
          {errors.EIN?.type === 'pattern' && <p>{errors.EIN?.message}</p>}
          {errors.EIN?.type === 'maxLength' && <p>{errors.EIN?.message}</p>}
          {errors.EIN?.type === 'validate' && <p>{'EIN not valid'}</p>}
        </div>

        <Button className="submitButton" variant="contained" type="submit">
          {userId ? 'Finish Edit' : 'Create'}
        </Button>
      </form>
      <Button variant="outlined" onClick={goBack}>
        {backButtonContent}
      </Button>
    </div>
  );
}
