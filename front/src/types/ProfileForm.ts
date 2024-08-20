export type GymMemberProfileForm = {
    email: string,
    password: string
    name: string
    confirmation: string
    userType: string;
}

export type PersonalProfileForm = {
    username: string,
    img?: string,
    name: string,
    lastName: string,
    email: string,
    zipCode: string,
    street: string,
    city: string,
    state: string,
    country: string,
    bio: string,
    role: string,
    specializations: string,
    price: string,
}
