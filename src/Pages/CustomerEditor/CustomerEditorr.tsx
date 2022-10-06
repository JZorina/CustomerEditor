import React, { useContext, useEffect, useState } from 'react';
import './CustomerEditor.css';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { Customer } from '../../Models/Customer';
import {
  Input,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import './CustomerEditor.css';
import { addCustomer, editCustomerById, getCustomerById } from '../../Apis/Api';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { words } from '../../Utils/Theme/Languages/En';
import { validateAmericanEIN } from '../../Utils/Functions';
import { ExternalData } from '../../Models/Externals';

const CustomerEditorr = () => {
  const [actionEndedSuccessfully, setActionResult] = useState<boolean>(false);
  const [data, setData] = useState<ExternalData>({
    externalCountries: null,
    externalCurrencies: null,
  });
  const [displaySpinner, setSpinner] = useState<boolean>(true);
  //const loaded = allCustomers != null;
  const [customer, setTest] = useState<Customer | null>(null);
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
  const formResult = useWatch({ control });
  const navigate = useNavigate();
  const {
    general: { backButtonContent },
    editorPage: { currencyLabel, countryLabel, successMesage },
    states: { USA },
  } = words;

  useEffect(() => {
    const { EIN, state, country } = formResult;
    setActionResult(false);
    if (country == USA && EIN && EIN.length > 0 && state && state.length > 0)
      validateAmericanEIN(EIN.toString(), state);
  }, [formResult]);

  useEffect(() => {
    if (userId) {
      fetchCustomer(Number(userId));
    } else setSpinner(false);
  }, [userId]);

  const fetchCustomer = async (userId: number) => {
    const result = await getCustomerById(userId);
    reset(result);
    setTest(result);
    setSpinner(false);
  };
  const onSubmit: SubmitHandler<Customer> = async (data) => {
    const newCustomer: Customer = {
      name: data.name,
      email: data.email,
      currency: data.currency,
      state: data.state,
      phoneNumber: data.phoneNumber,
      EIN: data.EIN,
      country: data.country,
      id: userId ? Number(userId) : undefined,
    };
    if (userId) await editCustomerById(newCustomer);
    else await addCustomer(newCustomer);
    setActionResult(true);
  };

  const handleCountryChange = (e: any) => {
    // setValue('country', e.target.value);
    // let prefix = externalCountries.filter(
    //   (i: GenericEntityModel) => i.value == e.target.value,
    // );
    // setValue('phoneNumberPrefix', prefix[0].prefix);
  };
  const handleCurrencyChange = (e: any) => {
    setValue('currency', e.target.value);
  };
  return (
    <div className="mainEditorContainer">
      {displaySpinner ? (
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              defaultValue={'Test'}
              className="input"
              placeholder="Name"
              {...register('name', { required: true, maxLength: 20 })}
            />
            <p>{errors.name?.type === 'required' && 'Name is required'}</p>
            <Input
              defaultValue={'Test@testim.com'}
              className="input"
              placeholder="Email"
              type="email"
              {...register('email', { required: true })}
            />
            <p>
              {errors.email?.type === 'required' && 'Email address is required'}
            </p>
            <FormControl fullWidth style={{ width: '50%' }}>
              <InputLabel id="currency">{currencyLabel}</InputLabel>
              <Select
                labelId="currency"
                id="currency"
                defaultValue={formResult.currency ?? 'Bahraini Dinar'}
                {...register('currency', { required: true })}
                label="currency"
                onChange={handleCurrencyChange}
              >
                {/* {currencies.map((element: GenericEntityModel) => (
                  <MenuItem value={element.value} key={element.id}>
                    {`${element.symbol} - ${element.value}`}
                  </MenuItem>
                ))} */}
              </Select>
              <p>
                {errors.currency?.type === 'required' && 'Currency is required'}
              </p>
            </FormControl>
            <FormControl fullWidth style={{ width: '50%' }}>
              <InputLabel id="country">{countryLabel}</InputLabel>
              <Select
                defaultValue={customer?.country ?? 'Tuvalu'}
                labelId="country"
                id="country"
                {...register('country', { required: true })}
                label="country"
                onChange={handleCountryChange}
              >
                {/* {countries.map((element: GenericEntityModel) => (
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
                ))} */}
              </Select>
              <p>
                {errors.country?.type === 'required' && 'Country is required'}
              </p>
            </FormControl>
            <Input
              className="input"
              placeholder="State"
              defaultValue={'test land'}
              {...register('state', { required: true, maxLength: 20 })}
            />
            <p>{errors.state?.type === 'required' && 'State is required'}</p>

            <div className="phoneInputsContainer">
              {/* <Input
                className="prefixPhoneNumberInput"
                placeholder="Prefix"
                type="text"
                defaultValue={'phoneNumberPrefix'}
                {...register('phoneNumberPrefix', {
                  required: true,
                  maxLength: 4,
                })}
              /> */}
              <Input
                className="phoneNumberInput"
                placeholder="Phone number"
                type="tel"
                defaultValue={'526635487'}
                {...register('phoneNumber', { required: true, maxLength: 10 })}
              />
            </div>
            <p>
              {/* {errors.phoneNumberPrefix?.type === 'required' && 
                'Prefix is required'}*/}
            </p>
            <p>
              {errors.phoneNumber?.type === 'required' && 'phone is required'}
            </p>

            <Input
              className="input"
              placeholder="EIN"
              defaultValue={'11-1111111'}
              {...register('EIN', {
                required: true,
                pattern: /^\d{2}\-?\d{7}$/,
              })}
            />
            <p>{errors.EIN?.type === 'required' && 'EIN is required'}</p>
            <p>
              {errors.EIN?.type === 'pattern' && 'EIN pattern is not valid'}
            </p>
            <Button className="submitButton" variant="contained" type="submit">
              {userId ? 'Finish Edit' : 'Create'}
            </Button>
            {actionEndedSuccessfully && <>{successMesage}</>}
          </form>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            {backButtonContent}
          </Button>
        </>
      )}
    </div>
  );
};
export default CustomerEditorr;
