import { useState } from 'react';

export default function App() {
  const [userList, setUserList] = useState([]);

  const handleCreateUser = user => {
    setUserList([...userList, user]);
  };

  console.log(userList);

  return (
    <>
      <div className="form">
        <Header />
        <form className="box">
          <Main handleCreateUser={handleCreateUser} />
        </form>
      </div>
    </>
  );
}

function Header() {
  return <h1 className="heading-primary">Create Account</h1>;
}

function Main({ handleCreateUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('male');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDrop, setSelectedDrop] = useState('--- Select an Option ---');
  const [sliderValue, setSliderValue] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [age, setAge] = useState('');
  const [textInput, setTextInput] = useState('');

  function handleCreateButtonClick() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !selectedOption
    )
      return;

    const newUser = confirmPassword === password && {
      firstName,
      lastName,
      email,
      password,
      selectedOption,
      selectedOptions,
      selectedDrop,
      sliderValue,
      isFileUploaded,
      age,
      textInput,
    };

    if (password === confirmPassword) handleCreateUser(newUser);
    else {
      alert(
        'Please check your email-address and make sure the Password and Confirm-Password is Matched '
      );
    }

    if (password === confirmPassword) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSelectedOption('male');
      setSelectedOptions([]);
      setSelectedDrop('--- Select an Option ---');
      setSliderValue(0);
      setIsFileUploaded(false);
      setAge('');
      setTextInput('');
    }
  }
  return (
    <>
      <NameBox
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />

      <EmailBox email={email} setEmail={setEmail} />

      <PasswordBox
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />

      <GenderBox
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <HobbiesBox
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />

      <SourceIncome
        selectedDrop={selectedDrop}
        setSelectedDrop={setSelectedDrop}
      />

      <RangeBox sliderValue={sliderValue} setSliderValue={setSliderValue} />

      <UploadBox
        isFileUploaded={isFileUploaded}
        setIsFileUploaded={setIsFileUploaded}
      />

      <AgeBox age={age} setAge={setAge} />

      <BioBox textInput={textInput} setTextInput={setTextInput} />

      <Bottom handleCreateButtonClick={handleCreateButtonClick} />
    </>
  );
}

function NameBox({ firstName, setFirstName, lastName, setLastName }) {
  return (
    <>
      <div className="input-box">
        <label htmlFor="first-name">First Name*</label>
        <input
          id="first-name"
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      </div>

      <div className="input-box">
        <label htmlFor="last-name">Last Name*</label>
        <input
          id="last-name"
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      </div>
    </>
  );
}

function EmailBox({ email, setEmail }) {
  return (
    <div className="input-box input-box-3">
      <label htmlFor="email">Email*</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
    </div>
  );
}

function PasswordBox({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) {
  const isCorrect = password === confirmPassword;

  return (
    <>
      <div className="input-box">
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength="6"
          required
        />
      </div>

      <div className="input-box">
        <label htmlFor="confirm-password">
          Confirm Password *{password && <span></span>}
          {isCorrect && password.length > 6 && confirmPassword.length > 6 && (
            <span className="pass">(Matched)</span>
          )}
          {!isCorrect && password.length > 6 && confirmPassword.length > 6 && (
            <span className="pass">(Invalid)</span>
          )}
        </label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Enter your Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
    </>
  );
}

function GenderBox({ selectedOption, setSelectedOption }) {
  return (
    <div className="input-box">
      <label>Gender*</label>
      <div className="gender-box">
        <div className="gender-in">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={e => setSelectedOption(e.target.value)}
            checked={selectedOption === 'male'}
            required
          />
          <label htmlFor="male">Male</label>
        </div>

        <div className="gender-in">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={selectedOption === 'female'}
            onChange={e => setSelectedOption(e.target.value)}
            required
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
    </div>
  );
}

function HobbiesBox({ selectedOptions, setSelectedOptions }) {
  const handleCheckboxChange = event => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const checkboxes = [
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'travel', label: 'Travel' },
    { value: 'movies', label: 'Movies' },
  ];

  return (
    <div className="input-box">
      <label>Hobbies</label>

      <div className="hobbies-box">
        {checkboxes.map(checkbox => (
          <div className="hobbies-in" key={checkbox.value}>
            <input
              type="checkbox"
              value={checkbox.value}
              checked={selectedOptions.includes(checkbox.value)}
              onChange={handleCheckboxChange}
              id={checkbox.value}
            />
            <label htmlFor={checkbox.value}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceIncome({ selectedDrop, setSelectedDrop }) {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  const options = [
    '--- Select an Option ---',
    'Private Employee',
    'Government Employee',
    'Entrepreneur',
    'Other',
  ];

  const handleDropdownClick = () => {
    setIsDropdownClicked(true);
  };

  const handleOptionChange = event => {
    const newValue = event.target.value;
    if (newValue !== selectedDrop) {
      setSelectedDrop(newValue);
    }
  };

  return (
    <div className="input-box">
      <label>Source of Income</label>
      <select
        value={selectedDrop}
        onChange={handleOptionChange}
        onClick={handleDropdownClick}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            disabled={
              isDropdownClicked && option === '--- Select an Option ---'
            }
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeBox({ sliderValue, setSliderValue }) {
  return (
    <div className="input-box">
      <label>Income</label>
      <div className="range">
        <input
          className="range-bar"
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={e => setSliderValue(+e.target.value)}
          step="5"
        />
        <p className="range-output">
          {sliderValue === 0 && '0'}
          {sliderValue !== 0 && sliderValue <= 99 && `${sliderValue}K`}
          {sliderValue !== 0 && sliderValue === 100 && `${sliderValue / 100}L+`}
        </p>
      </div>
    </div>
  );
}

function UploadBox({ isFileUploaded, setIsFileUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileUploaded(true);
  };

  return (
    <div className="input-box">
      <label>Upload Profile Picture</label>
      <input type="file" onChange={handleFileChange} className="upload-input" />
    </div>
  );
}

function AgeBox({ age, setAge }) {
  const [isAgeValid, setIsAgeValid] = useState(true);

  const handleAgeChange = event => {
    const newAge = event.target.value;
    setAge(newAge);
    setIsAgeValid(newAge >= 18);
  };

  return (
    <div className="input-box">
      <label htmlFor="age">Age</label>

      <input
        className="age-input"
        type="number"
        value={age}
        onChange={handleAgeChange}
        style={{
          borderColor: age === '' ? 'initial' : isAgeValid ? '#2eb70c' : 'red',
        }}
        min="18"
      />
    </div>
  );
}

function BioBox({ textInput, setTextInput }) {
  const handleTextChange = event => {
    const newText = event.target.value;
    setTextInput(newText);
  };

  return (
    <div className="input-box last-box">
      <label htmlFor="bio">Bio</label>
      <textarea
        type="text-area"
        id="bio"
        name="bio"
        rows="5"
        value={textInput}
        onChange={handleTextChange}
      />
    </div>
  );
}

function Bottom({ handleCreateButtonClick }) {
  return (
    <div className="form-footer">
      <button
        className="btn-create"
        type="submit"
        onClick={handleCreateButtonClick}
      >
        Create
      </button>
    </div>
  );
}
