import { useEffect, useRef, useState } from "react";

interface UserInfoFormProps {
  setValidationResult: (isValid: boolean) => void;
  onFormChange: (userInfo: UserInfo) => void; // Add this prop to pass user info up
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  tos: boolean;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  setValidationResult,
  onFormChange,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const street1Ref = useRef<HTMLInputElement>(null);
  const street2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const TOSRef = useRef<HTMLInputElement>(null);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [street1Valid, setStreet1Valid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [stateValid, setStateValid] = useState(false);
  const [zipValid, setZipValid] = useState(false);
  const [tosValid, setTosValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  const phoneRegex =
    /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/;

  const validateForm = (): boolean => {
    return (
      nameValid &&
      emailValid &&
      phoneValid &&
      street1Valid &&
      cityValid &&
      stateValid &&
      zipValid &&
      tosValid
    );
  };

  const handleNameChange = () => {
    const value = nameRef.current?.value.trim() || "";
    setNameValid(value !== "");
    onFormChange({ ...getUserInfo(), name: value });
  };

  const handleEmailChange = () => {
    const value = emailRef.current?.value || "";
    setEmailValid(emailRegex.test(value));
    onFormChange({ ...getUserInfo(), email: value });
  };

  const handlePhoneChange = () => {
    const value = phoneRef.current?.value || "";
    setPhoneValid(phoneRegex.test(value));
    onFormChange({ ...getUserInfo(), phone: value });
  };

  const handleStreet1Change = () => {
    const value = street1Ref.current?.value.trim() || "";
    setStreet1Valid(value !== "");
    onFormChange({ ...getUserInfo(), street1: value });
  };

  const handleCityChange = () => {
    const cityValue = cityRef.current?.value || "";
    setCity(cityValue);
    setCityValid(cityValue.trim() !== "");
    onFormChange({ ...getUserInfo(), city: cityValue });
  };

  const handleStateChange = () => {
    const stateValue = stateRef.current?.value || "";
    setState(stateValue);
    setStateValid(stateValue.trim() !== "");
    onFormChange({ ...getUserInfo(), state: stateValue });
  };

  const handleZipChange = () => {
    const value = zipRef.current?.value || "";
    setZipValid(zipRegex.test(value));
    onFormChange({ ...getUserInfo(), zip: value });
  };

  const handleTosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setTosValid(checked);
    onFormChange({ ...getUserInfo(), tos: checked });
  };

  const getUserInfo = (): UserInfo => ({
    name: nameRef.current?.value || "",
    email: emailRef.current?.value || "",
    phone: phoneRef.current?.value || "",
    street1: street1Ref.current?.value || "",
    street2: street2Ref.current?.value || "",
    city: cityRef.current?.value || "",
    state: stateRef.current?.value || "",
    zip: zipRef.current?.value || "",
    tos: TOSRef.current?.checked || false,
  });

  useEffect(() => {
    setValidationResult(validateForm());
  }, [
    nameValid,
    emailValid,
    street1Valid,
    cityValid,
    stateValid,
    zipValid,
    tosValid,
    setValidationResult,
  ]);

  const inputClassNames = (isValid: boolean) =>
    `mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      isValid ? "border-gray-300 bg-blue-100" : "border-red-500"
    }`;

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
            className={inputClassNames(nameValid)}
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
            className={inputClassNames(emailValid)}
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
            className={inputClassNames(phoneValid)}
          />
        </div>
        <div className="border border-zinc-200 mb-2"></div>
        <h2 className="text-center mt-4 font-semibold">Delivery Information</h2>
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
            className={inputClassNames(street1Valid)}
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
            className={inputClassNames(true)}
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
            className={inputClassNames(cityValid)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            ref={stateRef}
            onChange={handleStateChange}
            className={inputClassNames(stateValid)}
          />
          {!(
            city.toLowerCase() === "gainesville" &&
            (state.toLowerCase() === "fl" || state.toLowerCase() === "florida")
          ) &&
            city !== "" &&
            state !== "" && (
              <h1 className="text-red-600 my-1 font-bold px-2">
                You are located outside of our delivery zone. By checking out,
                you are agreeing to pick up your order at our physical location
                in Gainesville, Florida.
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
            className={inputClassNames(zipValid)}
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
