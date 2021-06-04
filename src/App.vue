<template>
  <div
    class="
      flex
      sm:container sm:mx-auto
      mx-4
      items-center
      justify-center
      min-h-screen
    "
  >

    <!-- Profile Card -->
    <div class="md:w-5/12 2xl:w-3/12 flex flex-col space-y-5 mt-8">
      <div class="flex items-center justify-center">
        <div class="flex items-center space-x-2">
          <div class="flex-shrink-0">
            <Card 
            nick="'Nith'"
            />
          </div>
        </div>
      </div>

      <!-- About -->
      <span class="border-t-3 sm:border-t-2 border-black @dark:border-white"/>
      <div>
        <h1 class="ml-2 md:mb-2 text-3xl text-black @dark:text-white">
            About me
        </h1>
        <div class="mt-1">
          <p class="border-l-1 sm:border-l-2 border-gray-400 px-3 md:px-4 text-sm sm:text-lg text-black @dark:text-white justify-center items-center">
            Hey there, Huseyin here. 19 y.o. front-end developer from 
            <a href="https://en.wikipedia.org/wiki/Turkey" class="hover:underline text-red-600">Turkey</a>. 
            <br> Right now, I'm trying to develop even further to become a full-stack developer asap. Although, I'm not understanding back-end algorithms right now but I'm pushing myself day by day. <br>
            Most of the time, I'm using <a class="text-blue-500 hover:underline" href="https://reactjs.org/">React</a> (as valueable as <a class="text-gray-800 @dark:text-gray-400 hover:underline" href="https://nextjs.org/">Next.js</a> too) but these days, I'm jumped into <a class="hover:underline text-green-400" href="https://vuejs.org/">Vue.js</a> because of the usage. <br>
            But! I like <a class="text-blue-500" draggable="false">React</a> a lot. Actually, I'm not separting both of these JS frameworks but React is way more useful for me.
        </p>
        </div>
      </div>
      <!-- Spotify - About -->
      <span class="border-t-3 sm:border-t-2 border-black @dark:border-white"/>
      <h1 class="text-3xl text-black @dark:text-white ml-2 ">What I'm listening up to now!</h1>
      <!-- Spotify Status -->
      <div
        :class="isConnecting && 'animate-pulse'"
        class="p-3 sm:p-6 py-3 sm:py-6 px-2 sm:px-4 mb-12 bg-gray-200 @dark:bg-gray-900 bg-opacity-75 shadow-xl rounded-xl"
      >
        <div v-if="!getPlayingStatus.error" class="space-y-4">
          <div class="flex items-center space-x-2 sm:space-x-4">
            <div class="flex-shrink-0">
              <img
                :src="getPlayingStatus?.image"
                width="128"
                height="128"
                class="rounded-xl sm:rounded-2xl sm:h-30 sm:w-30 h-14 w-14"
                draggable="false"
              />
            </div>
            <div class="overflow-x-hidden">
              <h1 class="font-semibold leading-tight text-md sm:text-lg text-black @dark:text-white truncate">
                {{ getPlayingStatus?.song || "Bir şey oynamamakta" }}
              </h1>
              <h2
                v-if="getPlayingStatus?.artist"
                class="text-black @dark:text-white leading-tight line-clamp-1 sm:line-clamp-2"
              >
                by {{ getPlayingStatus?.artist }}
              </h2>
              <h2
                v-if="getPlayingStatus?.album"
                class="text-black @dark:text-white leading-tight line-clamp-1 sm:line-clamp-2"
              >
                on {{ getPlayingStatus?.album }}
              </h2>
            </div>
          </div>
          <div>
            <Progress
              :start="getPlayingStatus?.timestamps?.start"
              :end="getPlayingStatus?.timestamps?.end"
            />
          </div>
        </div>
        <div v-else class="text-gray-800 @dark:text-white">I'm not listening anything right now, check it back later.</div>
      </div>
      <p class="border-l-2 border-gray-700 @dark:border-gray-100 px-2 text-md text-black text-shadow-sm @dark:text-white ml-1">powered by <a href="https://github.com/phineas/lanyard" class="underline hover:underline-double">lanyard</a>!</p>
      <span class="mt-5"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive } from "vue";
import Card from "./components/Card.vue";
import Progress from "./components/assets/Progress.vue";
import type { LanyardData } from "./types/lanyard";
// Fallback user ID that'll be used if there's no one specified as a parameter
const fallbackUserId = "495584014934081538";
// References
const socketLoaded = ref(true);
const user = reactive({ data: {} }) as { data: LanyardData };
// Computed methods
/**
 * Returns if we still haven't connected to Lanyard API.
 */
const isConnecting = computed(
  () => socketLoaded.value === true || Object.keys(user.data)?.length === 0
);
/**
 * Returns user information including formatted avatar URL.
 */
const getUser = computed(() => {
  const { username, id, discriminator, avatar } = user.data?.discord_user || {};
  const avatarUri = avatar
    ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
        avatar?.startsWith("a_") ? "gif" : "png"
      }?size=512`
    : "https://canary.discord.com/assets/7c8f476123d28d103efe381543274c25.png";
  return {
    username: username || "Loading",
    id: id || fallbackUserId,
    discriminator: discriminator || "0000",
    avatar: avatarUri,
  };
});
/**
 * Returns all essential playing status data in the Spotify object.
 */
const getPlayingStatus = computed(() => {
  const isSpotify = user.data?.spotify !== null;
  if (isSpotify) {
    const {
      album_art_url: image,
      song,
      artist,
      album,
      timestamps,
    } = user.data?.spotify || {};
    return {
      image: image || "https://via.placeholder.com/125x125C",
      song,
      album,
      artist,
      timestamps: timestamps || { start: 0, end: 0 },
    };
  } else return { error: true };
});
// Connect to Lanyard socket when the app is mounted
onMounted(() => {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");
  const userId =
    new URLSearchParams(location.search).get("userId") || fallbackUserId;
  // Send and let the API know which user we're subscribing
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: userId,
        },
      })
    );
    // Send heartbeat every 30 seconds
    setInterval(() => {
      ws.send(
        JSON.stringify({
          op: 3,
        })
      );
    }, 30000);
    socketLoaded.value = false;
  });
  ws.addEventListener("message", ({ data }) => {
    const { t: type, d: status } = JSON.parse(data);
    if (["INIT_STATE", "PRESENCE_UPDATE"].includes(type)) user.data = status;
  });
});
</script>
