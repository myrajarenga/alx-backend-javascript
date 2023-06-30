import { uploadPhoto, createUser } from './utils';

export default async function handleProfileSignup() {
  try {
    const [photoData, userData] = await Promise.all([uploadPhoto(), createUser()]);
    console.log(`${photoData.body} ${userData.firstName} ${userData.lastName}`);
  } catch (error) {
    console.log('Signup system offline');
  }
}
