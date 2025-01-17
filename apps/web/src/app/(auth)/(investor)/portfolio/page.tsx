"use client";
import React, { useState, useEffect } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  ChevronUp,
  DollarSign,
  Info,
  MoveUpRight,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import CoinIcon from "@/assets/icons/coin-vertical.svg";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getTokenAssets } from "@/blockchain/token.interaction";
import Link from "next/link";

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Your Token",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Average Token",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function Page() {
  return (
    <main>
      <section className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-start gap-x-2 gap-y-6 lg:flex-row">
          <Dashboard />
          <BestBuy />
        </div>
        <div className="mt-6 flex flex-col items-center justify-start gap-x-2 gap-y-6 lg:mt-0 lg:flex-row">
          <Assets />
          <Summary />
        </div>
      </section>
    </main>
  );
}

export default Page;

function Dashboard() {
  const [timeRange, setTimeRange] = useState("90d");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
  return (
    <section className="w-full pb-10 lg:w-[70%]">
      {/* chart */}
      <div className="mt-6 w-full">
        <Card className="rounded-[16px] border-[0.5px] bg-white/[0.02] md:h-96">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle className="">
                <h2 className="flex items-center justify-start gap-x-3 text-xl font-semibold">
                  Balance <ChevronRight size={20} />
                </h2>
              </CardTitle>
              <CardDescription>
                <h2 className="mt-2 flex items-end justify-start gap-x-3 text-5xl font-semibold">
                  $0<span className="-ms-2 text-muted">.00</span>
                  <h5 className="-ms-2 flex items-center justify-start gap-x-1 text-sm text-green-500">
                    <ChevronUp size={15} /> 85.66%
                  </h5>
                </h2>
              </CardDescription>
            </div>

            <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border-[0.5px] bg-background p-1.5 font-azeret text-[0.688rem] sm:ml-auto">
              <div
                className={cn(
                  "px-2 py-0.5",
                  timeRange === "7d" && "rounded-sm bg-primary/5",
                )}
                onClick={() => setTimeRange("7d")}
              >
                1W
              </div>
              <div
                className={cn(
                  "px-2 py-0.5",
                  timeRange === "30d" && "rounded-sm bg-primary/5",
                )}
                onClick={() => setTimeRange("30d")}
              >
                1M
              </div>
              <div
                className={cn(
                  "px-2 py-0.5",
                  timeRange === "90d" && "rounded-sm bg-primary/5",
                )}
                onClick={() => setTimeRange("90d")}
              >
                3M
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pt-4 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart data={filteredData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Bar dataKey="mobile" fill="var(--color-mobile)" stackId="a" />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function BestBuy() {
  return (
    <>
      <section className="-mt-4 w-full rounded-[16px] border-[0.5px] bg-white/[0.02] px-3 py-4 shadow-none md:h-[390px] lg:w-[30%]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Best to buy</h2>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-primary">
            <RefreshCcw size={15} />
          </div>
        </div>
        <h2 className="mt-2 flex items-end justify-start gap-x-3 text-4xl font-semibold text-gray-400">
          $0<span className="-ms-2 text-muted">.00</span>
        </h2>
        <div>
          <h2 className="flex items-center justify-start gap-x-2">
            Ethereum <span className="font-semibold text-muted">ETH</span>
            <h5 className="-ms-2 flex items-center justify-start gap-x-1 text-sm text-green-500">
              <ChevronUp size={15} /> 85.66%
            </h5>
          </h2>
        </div>
        <section className="my-3 flex  flex-wrap items-center justify-start gap-x-2 gap-y-3">
          <button className="w-full rounded-full border p-2 px-8 py-1 hover:bg-primary/25 sm:w-fit">
            Smart trade
          </button>
          <button className="w-full rounded-full border p-2 px-8 py-1 hover:bg-primary/25 sm:w-fit">
            Set Alert
          </button>
        </section>
      </section>
    </>
  );
}

function Assets() {
  const router = useRouter();
  const { address } = useAccount();

  const {
    isPending,
    error,
    data: tokens,
  } = useQuery({
    queryKey: ["getTokenAssets", address],
    queryFn: () => getTokenAssets(address!),
  });

  if (isPending) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-[16px] border-[0.5px] bg-white/[0.02] px-3 pb-10 lg:h-96 lg:w-[70%]">
        Loading assets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-[16px] border-[0.5px] bg-white/[0.02] px-3 pb-10 lg:h-96 lg:w-[70%]">
        Error loading assets
      </div>
    );
  }

  const allAssets = () => {
    router.push("/assets");
  };
  return (
    <section className="w-full rounded-[16px] border-[0.5px] bg-white/[0.02] px-3 pb-10 lg:h-96 lg:w-[70%]">
      <div className="ms-1.5 mt-4 flex items-center justify-start gap-x-4">
        <h2 onClick={allAssets} className="cursor-pointer text-lg">
          All assets
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className=" flex items-center gap-1">
                <Info size={14} className="text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                We're actively developing these assets.
                <br /> Stay tuned!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* assets */}
      <section className="mt-6">
        <section className="flex border-b text-lg font-semibold text-muted">
          <div className="w-[30%] p-2">Name</div>
          <div className="w-[30%] p-2">Balance</div>
          <div className="w-[30%] p-2">Value</div>
          <div className="w-[30%] p-2"></div>
        </section>
        {tokens.map((token) => (
          <Link key={token.tokenAddress} href={`/token/${token.tokenAddress}`}>
            <section className="flex flex-wrap items-center justify-start border-b p-2 hover:bg-primary/5 md:flex-nowrap">
              <div className="flex w-[30%] items-center justify-start gap-x-1 p-2 text-base sm:text-lg">
                <Image
                  src={CoinIcon}
                  alt="coin"
                  className="rounded-full"
                  width={25}
                  height={25}
                />
                <h3>{token.name}</h3>
              </div>
              <div className="w-[30%] p-2 text-base sm:text-lg">
                {token.balance} {token.symbol}
              </div>
              <div className="w-[30%] p-2 text-base text-gray-400 sm:text-lg">
                $0
              </div>
              <div className="flex w-[30%] items-center justify-start gap-x-2 p-2">
                {/* <button className="border-full rounded-full bg-muted p-2 px-8 hover:bg-primary/25">
                  Buy
                </button>
                <button className="border-full rounded-full bg-muted p-2 px-8 hover:bg-primary/25">
                  Send
                </button> */}
              </div>
            </section>
          </Link>
        ))}
      </section>
    </section>
  );
}
function Summary() {
  return (
    <>
      <section className="w-full rounded-[16px] border-[0.5px] bg-white/[0.02] px-3 py-4 shadow-none md:h-[385px] lg:w-[30%]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Summary</h2>
        </div>
        <h2 className="mt-2 flex items-end justify-start gap-x-3 text-4xl font-semibold text-gray-400">
          $ 0<span className="-ms-2 text-muted">.00</span>
        </h2>

        <div className="my-6 flex w-full items-center justify-start gap-x-4">
          <div className="flex h-12 w-12  items-center justify-center rounded-full bg-blue-300/20">
            <DollarSign color="blue" size={25} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl">$ 0.00</h2>
            <div className="flex items-center  justify-between">
              <h2 className="text-muted">Available to trade</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className=" flex items-center gap-1">
                      <Info size={14} className="text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      We're actively developing these assets.
                      <br /> Stay tuned!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="my-6 flex w-full items-center justify-start gap-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 opacity-65">
            <MoveUpRight color="green" size={25} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl">$ 0.00</h2>
            <div className="flex items-center  justify-between">
              <h2 className="text-muted">Available cash out</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className=" flex items-center gap-1">
                      <Info size={14} className="text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      We're actively developing these assets.
                      <br /> Stay tuned!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <button className="mt-6 w-full rounded-full bg-muted p-2 px-8 py-2 hover:bg-primary/25">
          Cash Out
        </button>
      </section>
    </>
  );
}
