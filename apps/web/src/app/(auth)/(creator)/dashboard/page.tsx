"use client";
import React from "react";
import NotificationBanner from "@/partials/NotificationBanner";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import Image from "next/image";
import LineChart from "@/components/charts/LineChart";
function Page() {
  return (
    <main>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <NotificationBanner />
        {/* <ThreeDCardDemo /> */}
        <section className="body-font text-gray-700">
          <div className="container mx-auto px-5">
            <div className="-m-4 flex flex-wrap text-center">
              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="transform rounded-lg border-2 border-gray-600 px-4 py-6 transition duration-500 hover:scale-110">
                  <svg
                    className="bi bi-cash mb-3 inline-block h-12 w-12 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                  </svg>
                  \
                  <h2 className="title-font text-3xl font-medium text-white">
                    $ 2.7K
                  </h2>
                  <p className="leading-relaxed text-primary">Total Assets</p>
                </div>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="transform rounded-lg border-2 border-gray-600 px-4 py-6 transition duration-500 hover:scale-110">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="mb-3 inline-block h-12 w-12 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                  </svg>
                  <h2 className="title-font text-3xl font-medium text-white">
                    1.3K
                  </h2>
                  <p className="leading-relaxed text-primary">Followers</p>
                </div>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="transform rounded-lg border-2 border-gray-600 px-4 py-6 transition duration-500 hover:scale-110">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="mb-3 inline-block h-12 w-12 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                  </svg>
                  <h2 className="title-font text-3xl font-medium text-white">
                    300
                  </h2>
                  <p className="leading-relaxed text-primary">
                    Active Listeners
                  </p>
                </div>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="transform rounded-lg border-2 border-gray-600 px-4 py-6 transition duration-500 hover:scale-110">
                  <Image
                    className="mb-3 inline-block h-20 w-20 rounded-full border-2 border-primary"
                    src="/images/profile-nft3.png"
                    alt="user-profile"
                    width={200}
                    height={200}
                  />
                  <p className="leading-relaxed text-primary">Total Balance</p>

                  <h2 className="title-font mt-4 font-medium text-white sm:text-base md:text-xl lg:text-3xl">
                    $15,653.07
                  </h2>
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <span className="rounded-full border-2 bg-primary p-2 text-sm font-bold text-black">
                      +12.34%
                    </span>
                    <span className="h-10 w-10 rounded-full border-2 bg-primary p-2 text-sm font-bold">
                      &#8599;
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 w-full border-2 border-primary text-white lg:w-[77%]">
              Tabs here...
            </p>
            <LineChart />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
