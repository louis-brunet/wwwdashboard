<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const signIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((data) => {
      console.log("Logged in !");
      console.log(auth.currentUser);

      const redirect = router.currentRoute.value.query.redirect as string;
      router.push(redirect);
    })
    .catch((err) => {
      console.error("Error while loggin in ! ", err);
    });
};
</script>

<template>
  <div>
    Log in !
    <button @click="signIn">Google log in</button>
  </div>
</template>
