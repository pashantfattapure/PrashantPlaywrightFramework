// Test Data - Centralized test case data
export const TEST_DATA = {
  USER: {
    name: 'John',
    email: 'john@test.com',
    phone: '1234567890',
    message: 'Karve Nagar'
  },
  
  FORM_INPUTS: [
    { fieldIndex: 0, value: 'John', fieldName: 'Name' },
    { fieldIndex: 1, value: 'john@test.com', fieldName: 'Email' },
    { fieldIndex: 2, value: '1234567890', fieldName: 'Phone' }
  ],
  
  RADIO_SELECTION: {
    byName: {
      'John': 'male',
      'default': 'female'
    }
  },
  
  CHECKBOXES: [
    'Sunday',
    'Monday', 
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
};

export interface UserData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const getFormInputData = (user: UserData | typeof TEST_DATA.USER) => [
  { fieldIndex: 0, value: user.name, fieldName: 'Name' },
  { fieldIndex: 1, value: user.email, fieldName: 'Email' },
  { fieldIndex: 2, value: user.phone, fieldName: 'Phone' }
];
