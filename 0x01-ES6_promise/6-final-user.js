/* eslint-disable */
import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  try {
    const [userResult, photoResult] = await Promise.allSettled([userPromise, photoPromise]);
    return [
      { status: userResult.status, value: userResult.value },
      { status: photoResult.status, value: photoResult.value },
    ];
  } catch (error) {
    // Handle any errors that occurred during Promise.allSettled
    return [
      { status: 'rejected', value: error },
    ];
  }
}
