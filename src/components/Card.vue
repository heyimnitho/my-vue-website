<template>
    <div>
        <div class="w-full">
            <div class="flex flex-col justify-center max-w-sm my-6 mx-auto bg-white shadow-2xl shadow-gray-900 rounded-xl p-9 @dark:bg-gray-900">
                <div class="">
                    <img 
                    class="w-36 transition-all duration-200 hover:w-32 mx-auto shadow-2xl ring-4 ring-gray-900 ring-opacity-25 @dark:ring-light-400 @dark:ring-opacity-50 rounded-full" 
                    src="https://avatars.githubusercontent.com/u/60431344?s=400&u=4ca1b9f8d86aef774e5962e9799f49093d0abd29&v=4" 
                    alt="Nith's Photo" 
                    />
                </div>
                <div class="text-center mt-5">
                    <p class="text-lg sm:text-xl font-semibold text-gray-900 @dark:text-gray-50">
                        Hüseyin {{ nick }} Yalçın
                    </p>
                    <p 
                    class="text-xs sm:text-base text-violet-300 opacity-75 pt-3 pb-4 px-4 w-58 inline-block border-b-2 border-gray-500 @dark:border-white"
                    draggable="false"
                    >
                        Front-End Developer
                    </p>
                    <div class="mt-6 flex align-center justify-center mt-3">
                        <a class="text-md hover:text-lg sm:text-lg sm:hover:text-xl m-1 p-2 sm:m-2 sm:p-3 text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-all duration-400 @dark:text-gray-200 @dark:hover:bg-gray-500" href="https://github.com/heyimnitho" alt="mostly using this website">
                            <Github class="mt-0.5" />
                            <span class="sr-only">Github</span>
                        </a>
                        <a class="text-lg hover:text-xl sm:text-xl sm:hover:text-2xl m-1 p-2 sm:m-2 sm:p-3 text-purple-500 hover:bg-purple-500 rounded-full hover:text-white transition-all duration-400" href="https://twitch.tv/heyimnitho" alt="sometimes livestreaming">
                            <Twitch />
                            <span class="sr-only">Twitter</span>
                        </a>
                        <a class="text-lg hover:text-xl sm:text-xl sm:hover:text-2xl m-1 p-2 sm:m-2 sm:p-3 text-indigo-500 hover:bg-indigo-500 rounded-full hover:text-white transition-all duration-400" href="https://discord.com/users/495584014934081538" alt="i don't what i'm doing in this platform">
                            <Discord />
                            <span class="sr-only">Discord</span>
                        </a>
                        <a class="text-lg hover:text-xl sm:text-xl sm:hover:text-2xl m-1 p-2 sm:m-2 sm:p-3 text-blue-500 hover:bg-blue-500 rounded-full hover:text-white transition-all duration-400" href="mailto:kaguwo@yandex.com" alt="mail me if you need a job to do">
                            <Mail />
                            <span class="sr-only">Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Github from './icons/Github.vue';
import Twitch from './icons/Twitch.vue';
import Discord from './icons/Discord.vue';
import Mail from './icons/Mail.vue';

import { defineProps } from "vue";

defineProps({
    nick: String
})
</script>