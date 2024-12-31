"use server";

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";

const token =
  "skqODn13aV6DEUOw1675AlgyjeLvqzR0zM0ZQhm7jIdfjaNJlSHe33qg0rGF6TU3bDJ7LBawPlRJkXt4vdiAlvgBkgkdYREprp7epZ4ymHTW98xBKGsuxwbfd7bfeyUN38npdCvB8nE7tBBS4etHA4rRs4C9Pbge5jlgGncQho3O06mvPAKh";
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});
