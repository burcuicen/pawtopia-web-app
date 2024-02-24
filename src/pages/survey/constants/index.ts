interface StepItem {
    key: number
    questionField: 'purpose' | 'animalPreference' | 'ageRange' | 'genderPreference' | 'healthStatus' | 'animalCareHistory'
    type: 'paw-seeker' | 'paw-guard' | 'other'
    description: string
    question: string
    options?: {key: string, label: string}[]
    customOptions?: {
        gender: {key: string, label: string}[]
        healthStatus: {key: string, label: string}[]
    }
    answerType: 'text'| 'radio'| 'custom' | 'dropdown'
}
export const PAW_SEEKER_STEPS = [
    {
        key: 1,
        questionField: 'purpose',
        type: 'paw-seeker',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "What excites you about Pawtopia?",
        answerType: 'radio',
        options: [
            {key: 'looking-pet', label: "I'm looking for a paw friend!"},
            {key: 'looking-guardian', label: "I'm looking for a new home for my paw friend!"},
            {key: 'other', label: "Just exploring"}
        ]
    },
    {
        key: 2,
        questionField: 'animalPreference',
        type: 'paw-seeker',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "So, what kind of paws have stolen your heart?",
        answerType: 'radio',
        options: [
            {key: 'cat', label: "Cat"},
            {key: 'dog', label: "Dog"},
            {key: 'other', label: "Others"},
            {key: 'just-looking', label: "Just looking, haven’t decided yet."}
        ]
    },
    {
        key:3,
        questionFiled: 'custom',
        type: 'paw-seeker',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "How should your ideal paw friend be?",
        answerType: 'custom',
        customOptions: {
            gender: [
                {key: 'male', label: 'Male'},
                {key: 'female', label: 'Female'},
                {key: 'doesnt-matter', label: "Doesn't matter"}
            ],
            healthStatus: [
                {key: 'healthy', label: 'Healthy'},
                {key: 'special-needs', label: 'Special needs'},
                {key: 'doesnt-matter', label: "Doesn't matter"}
            ]
        }
    },
    {
        key:4,
        questionField: 'animalCareHistory',
        type: 'paw-seeker',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "Do you / Did you have a pet?",
        answerType: 'radio',
        options: [
            {key: true, label: "Yes"},
            {key: false, label: "No"},
            {key: false, label: "I would rather not answer"}
        ]
    }
] as StepItem[]
export const PAW_GUARD_STEPS = [
    {
        key: 1,
        questionField: 'purpose',
        type: 'paw-guard',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "What excites you about Pawtopia?",
        answerType: 'radio',
        options: [
            {key: 'looking-pet', label: "I'm looking for a paw friend!"},
            {key: 'looking-guardian', label: "I'm looking for a new home for my paw friend!"},
            {key: 'other', label: "Just exploring"}
        ]
    },
    {
        key: 2,
        questionField: 'animalPreference',
        type: 'paw-guard',
        description: "Tell us a bit about your paw friend who needs a new home.",
        question: "What type of pet are you rehoming?",
        answerType: 'radio',
        options: [
            {key: 'cat', label: "Cat"},
            {key: 'dog', label: "Dog"},
            {key: 'other', label: "Others"},
        ]
    }
]
export const OTHER_STEPS = [
    {
        key: 1,
        questionField: 'purpose',
        type: 'other',
        description: "Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!",
        question: "What excites you about Pawtopia?",
        answerType: 'radio',
        options: [
            {key: 'looking-pet', label: "I'm looking for a paw friend!"},
            {key: 'looking-guardian', label: "I'm looking for a new home for my paw friend!"},
            {key: 'other', label: "Just exploring"}
        ]
    }
]