import { useEffect, useRef, useState } from "react";

interface UserInfoFormProps {
  setValidationResult: (isValid: boolean) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ setValidationResult }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const street1Ref = useRef<HTMLInputElement>(null);
  const street2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const TOSRef = useRef<HTMLInputElement>(null);

  const [city, setCity] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [street1Valid, setStreet1Valid] = useState(false);
  const [street2Valid, setStreet2Valid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [zipValid, setZipValid] = useState(false);
  const [tosValid, setTosValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  const phoneRegex = /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/;



  const validateForm = (): boolean => {
    return (
      nameValid &&
      emailValid &&
      phoneValid &&
      street1Valid &&
      cityValid &&
      zipValid &&
      tosValid
    );
  };

  const handleNameChange = () => {
    setNameValid(nameRef.current?.value.trim() !== "");
  };

  const handleEmailChange = () => {
    setEmailValid(
      emailRef.current ? emailRegex.test(emailRef.current.value) : false
    );
  };

  const handlePhoneChange = () => {
    setPhoneValid(
      phoneRef.current ? phoneRegex.test(phoneRef.current.value) : false
    );
  };

  const handleStreet1Change = () => {
    setStreet1Valid(street1Ref.current?.value.trim() !== "");
  };

  const handleCityChange = () => {
    const cityValue = cityRef.current?.value || "";
    setCity(cityValue);
    setCityValid(cityValue.trim() !== "");
  };

  const handleZipChange = () => {
    setZipValid(zipRef.current ? zipRegex.test(zipRef.current.value) : false);
  };

  const handleTosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTosValid(event.target.checked);
  };

  useEffect(() => {
    setValidationResult(validateForm());
  }, [
    nameValid,
    emailValid,
    street1Valid,
    street2Valid,
    cityValid,
    zipValid,
    tosValid,
    setValidationResult,
  ]);

  return (
    <div className="mt-2">
      <div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            onChange={handleEmailChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            ref={phoneRef}
            onChange={handlePhoneChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="border border-zinc-200 mb-2"></div>
        <div className="mb-4">
          <label
            htmlFor="street1"
            className="block text-sm font-medium text-gray-700"
          >
            Street 1
          </label>
          <input
            type="text"
            id="street1"
            ref={street1Ref}
            onChange={handleStreet1Change}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="street2"
            className="block text-sm font-medium text-gray-700"
          >
            Street 2
          </label>
          <input
            type="text"
            id="street2"
            ref={street2Ref}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            ref={cityRef}
            onChange={handleCityChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {city !== "Gainesville" && city !== "" && (
            <h1 className="text-red-600 my-1 font-bold px-2">
              You are located outside of our delivery zone. By checking out, you
              are agreeing to pick up your order at our physical location in
              Gainesville, Florida.
            </h1>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            ref={zipRef}
            onChange={handleZipChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="border border-zinc-200 mb-2"></div>
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="TOS"
            ref={TOSRef}
            onChange={handleTosChange}
            className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <label
            htmlFor="TOS"
            className="block text-sm font-medium text-gray-700"
          >
            I am 18 years of age or older and agree to the terms of the{" "}
            <a
              href="/termsOfSale"
              target="_blank"
              className="underline font-bold"
            >
              Terms of Sale.
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
