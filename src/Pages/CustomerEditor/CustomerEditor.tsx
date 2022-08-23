import React, { useContext, useEffect, useState } from 'react';
import "./CustomerEditor.css";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { CustomerModel } from '../../Models/Customer';
import { Input, Button, Select,InputLabel, MenuItem, FormControl} from '@mui/material';
import "./CustomerEditor.css";
import { addCustomer, editCustomerById, getCustomerById } from '../../Services/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import DataContext from '../../Contexts/DataContext';
import { GenericEntityModel } from '../../Models/GenericEntity';
import { netTermsOptions, paymentMethodsOptions } from '../../Utils/Mocks';
import { words } from '../../Utils/Texts';

const CustomerEditor = () => {
    const {externalCountries, externalCurrencies} = useContext<{externalCountries:any[], externalCurrencies:GenericEntityModel[]}>(DataContext);
    const [displayEntityForm, setDisplayEntityForm] = useState<boolean>(false);
    const [entityIndex, setEntityIndex] = useState<number>(0);
    const [actionEndedSuccessfully, setActionResult] = useState<boolean>(false);
    const [countries, setCountries] = useState<GenericEntityModel[]>([]);
    const [currencies, setCurrencies] = useState<GenericEntityModel[]>([]);
    const [displaySpinner, setSpinner] = useState<boolean>(true);
    const [customer, setTest] = useState<CustomerModel|null>(null);
    const { register, handleSubmit, control,formState: { errors },reset, setValue  } = useForm<CustomerModel>({
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });
    let { userId } = useParams();
    const formResult = useWatch({ control });
    const  navigate = useNavigate();
    const {general:{BackButtonContent},editorPage:{CurrencyLabel, CountryLabel, PaymentMethodLabel,NetTermsLabel }} = words;

  

    useEffect(() => {
        setActionResult(false);
      }, [formResult]);

      useEffect(()=>{
        if(userId){
            fetchCustomer(Number(userId));
        }
        else setSpinner(false)
      },[userId])

      useEffect(()=>{
        setCountries(externalCountries);
        setCurrencies(externalCurrencies);
      },[])

    const fetchCustomer = async (userId:number) => {
        const result =  await getCustomerById(userId);
        reset(result)
        setTest(result)
        setSpinner(false)
      }
    const onSubmit: SubmitHandler<CustomerModel> = async data => {
        await dispatchData(data);
    };
    const dispatchData = async (data:CustomerModel) => {
        const newCustomer: CustomerModel = {
            name:data.name,
            email:data.email,
            currency:data.currency,
            state:data.state,
            phoneNumberPrefix:data.phoneNumberPrefix,
            phoneNumber:data.phoneNumber,
            EIN:data.EIN,
            country:data.country,
            id: userId ? Number(userId):undefined
        }
        if(userId)
            await editCustomerById(newCustomer);
        else await addCustomer(newCustomer);
        setActionResult(true);
    }
    const addEntity = () => {
        setEntityIndex(entityIndex=>entityIndex+1);
        setDisplayEntityForm(false);
    }
    const handleCountryChange  = (e:any) => {
       setValue("country",e.target.value)
    }
    const handleCurrencyChange  = (e:any) => {
       setValue("currency",e.target.value)
    }
    const handleNetTermChange  = (e:any) => {
       setValue(`Entities.${entityIndex}.netTermsId`,e.target.value)
    }
    const handlePaymentMethodChange  = (e:any) => {
       setValue(`Entities.${entityIndex}.paymentMethodId`,e.target.value)
    }

    return (
        <div className='mainEditorContainer'>
            {displaySpinner ? (
          <LoadingSpinner />
          ) : (
            <>
           <form  onSubmit={handleSubmit(onSubmit)}>
                <Input 
                defaultValue={'Test'}
                className='input' 
                placeholder="Name" 
                {...register("name",{ required: true, maxLength: 20 })} 
                />
               <p>{errors.name?.type === 'required' && "Name is required"}</p>
                <Input 
                defaultValue={'Test@testim.com'}
                className='input' 
                placeholder="Email" 
                type='email'
                {...register("email", { required: true })} 
                />
                <p>{errors.email?.type === 'required' && "Email address is required"}</p>
                <FormControl fullWidth style={{width:'50%'}} >
                    <InputLabel id="currency">{CurrencyLabel}</InputLabel>
                    <Select
                    labelId="currency"
                    id="currency"
                    defaultValue={formResult.currency ?? 'Bahraini Dinar' }
                    {...register("currency", { required: true })}
                    label="currency"
                    onChange={handleCurrencyChange}>
                        {currencies.map((element:GenericEntityModel) => (
                            <MenuItem
                            value={element.value}
                            key={element.value}
                            >
                                {`${element.symbol} - ${element.value}`}
                            </MenuItem>
                            ))}
                        </Select>
                        <p>{errors.currency?.type === 'required' && "Currency is required"}</p>
                    </FormControl>
                    <FormControl fullWidth  style={{width:'50%'}}>
                        <InputLabel id="country">{CountryLabel}</InputLabel>
                        <Select
                            defaultValue={customer?.country ?? 'Tuvalu' }
                            labelId="country"
                            id="country"
                            {...register("country", { required: true })}
                            label="country"
                            onChange={handleCountryChange}>
                                {countries.map((element:GenericEntityModel) => (
                                <MenuItem
                                value={element.value}
                                key={element.value}
                                >
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
                        <p>{errors.country?.type === 'required' && "Country is required"}</p>
                    </FormControl>
                    <Input 
                    className='input' 
                    placeholder="State" 
                    defaultValue={'test land'}
                    {...register("state", { required: true, maxLength: 20 })} 
                    />
                    <p>{errors.state?.type === 'required' && "State is required"}</p>
                    
                    <div className="phoneInputsContainer">
                        <Input 
                        className='prefixPhoneNumberInput' 
                        placeholder="Prefix" 
                        type='text' 
                        defaultValue={'+972'}
                        {...register("phoneNumberPrefix", { required: true,maxLength:4 })} 
                        />
                        <Input 
                        className='phoneNumberInput'  
                        placeholder="Phone number" type='phone' 
                        defaultValue={'526635487'}
                        {...register("phoneNumber", { required: true,maxLength:10})} />
                    </div>
                    <p>{errors.phoneNumberPrefix?.type === 'required' && "Prefix is required"}</p>
                    <p>{errors.phoneNumber?.type === 'required' && "phone is required"}</p>

                    <Input 
                    className='input' 
                    placeholder="EIN"  
                    defaultValue={'12-123456'}
                    {...register("EIN", { required: true,maxLength: 9 })} />
                    <p>{errors.EIN?.type === 'required' && "EIN is required"}</p>
                    {   
                        displayEntityForm &&
                        <div className='entityFormContainer'>
                        <Input className="entityFormItem" placeholder="Address" type='' {...register(`Entities.${entityIndex}.address`, { required: true })} />
                        <FormControl fullWidth style={{width:'60%'}}>
                        <InputLabel id="paymentMethodId">{PaymentMethodLabel}</InputLabel>
                            <Select
                                labelId="paymentMethodId"
                                id="paymentMethodId_"
                               {...register(`Entities.${entityIndex}.paymentMethodId`, { required: true })}
                                label="Payment Method"
                                onChange={handlePaymentMethodChange}>
                                    {paymentMethodsOptions.map((element:GenericEntityModel) => (
                                    <MenuItem
                                    value={element.value}
                                    key={element.id}
                                    >
                                        {element.value}
                                    </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                         <FormControl fullWidth style={{width:'60%'}}>
                            <InputLabel id="netTermsId">{NetTermsLabel}</InputLabel>
                            <Select
                                labelId="netTermsId"
                                id="netTermsId"
                              {...register(`Entities.${entityIndex}.netTermsId`, { required: true })}
                                label="Net Terms"
                                onChange={handleNetTermChange}>
                                    {netTermsOptions.map((element:GenericEntityModel) => (
                                    <MenuItem
                                    value={element.value}
                                    key={element.id}
                                    >
                                        {element.value}
                                    </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <Input className="entityFormItem" placeholder="VAT" type='' {...register(`Entities.${entityIndex}.VAT`, { required: true })} />
                        <Button className='entityFormItem' variant="contained" type="button" onClick = {addEntity}>Confirm Entity</Button>
                    </div>
                    
                }
                <Button className='submitButton' variant="contained" type="submit">{userId ? 'Finish Edit': 'Create'}</Button>
                {actionEndedSuccessfully && 
                    <>
                    Oh yeah!
                    </>
                }
            </form>
            <Button variant="outlined" onClick={()=>navigate(-1)}>{BackButtonContent}</Button>
            </>
            )}
        </div>
    )

}
export default CustomerEditor;