"use client";

import { useMemo, useState } from "react";
import {
    ArrowRight,
    BarChart3,
    Bell,
    Check,
    ChevronDown,
    Clock3,
    Download,
    FileText,
    Menu,
    Plus,
    Receipt,
    Search,
    Settings,
    Sparkles,
    UserRound,
    WalletCards,
    X,
} from "../../components/icons";

const invoices = [
    {
        id: "INV-2026-0248",
        customer: "Northstar Studio",
        email: "hello@northstar.studio",
        amount: "$3,410.00",
        status: "Paid",
        date: "Sep 30, 2026",
        initials: "NS",
    },
    {
        id: "INV-2026-0247",
        customer: "Acme Creative",
        email: "billing@acmecreative.com",
        amount: "$2,840.00",
        status: "Pending",
        date: "Sep 29, 2026",
        initials: "AC",
    },
    {
        id: "INV-2026-0246",
        customer: "Orbit Studio",
        email: "finance@orbitstudio.io",
        amount: "$1,920.00",
        status: "Paid",
        date: "Sep 28, 2026",
        initials: "OS",
    },
    {
        id: "INV-2026-0245",
        customer: "Vertex Labs",
        email: "accounts@vertexlabs.io",
        amount: "$4,280.00",
        status: "Overdue",
        date: "Sep 26, 2026",
        initials: "VL",
    },
    {
        id: "INV-2026-0244",
        customer: "Bluewave Media",
        email: "pay@bluewave.media",
        amount: "$1,650.00",
        status: "Paid",
        date: "Sep 25, 2026",
        initials: "BM",
    },
];

const chartData = [42, 54, 48, 66, 58, 76, 71, 88, 79, 96, 91, 108];

const navItems = [
    {
        label: "Overview",
        icon: BarChart3,
    },
    {
        label: "Invoices",
        icon: Receipt,
        count: "24",
    },
    {
        label: "Customers",
        icon: UserRound,
    },
    {
        label: "Payments",
        icon: WalletCards,
    },
    {
        label: "Reports",
        icon: FileText,
    },
];

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("Overview");
    const [period, setPeriod] = useState("Last 12 months");

    const totalRevenue = useMemo(() => {
        return "$84,290";
    }, []);

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-[#10152b]">
            {sidebarOpen && (
                <button
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >

                {/* Brand */}
                <div className="flex h-[76px] items-center border-b border-slate-100 px-5">
                    <a
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#10152b] text-white shadow-lg shadow-slate-300/50 transition group-hover:-translate-y-0.5">
                            <span className="text-lg font-black">
                                S
                            </span>
                        </div>

                        <div>
                            <div className="text-[16px] font-black tracking-tight">
                                SAC{" "}
                                <span className="bg-gradient-to-r from-[#625bf0] to-[#7c3aed] bg-clip-text text-transparent">
                                    InvoicePro
                                </span>
                            </div>

                            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                Billing workspace
                            </div>
                        </div>
                    </a>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Workspace */}
                <div className="px-4 pt-5">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center gap-3">

                            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#625bf0] to-[#7c3aed] text-xs font-black text-white">
                                SK
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold text-[#10152b]">
                                    SAC Workspace
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                    Business account
                                </p>
                            </div>

                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="px-4 pt-7">

                    <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Workspace
                    </p>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = activeNav === item.label;

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        setActiveNav(item.label);
                                        setSidebarOpen(false);
                                    }}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${active
                                        ? "bg-[#10152b] text-white shadow-lg shadow-slate-300/40"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-[#10152b]"
                                        }`}
                                >
                                    <Icon
                                        className={`h-[17px] w-[17px] ${active
                                            ? "text-[#a9a4ff]"
                                            : "text-slate-400 group-hover:text-[#625bf0]"
                                            }`}
                                    />

                                    <span className="flex-1">
                                        {item.label}
                                    </span>

                                    {item.count && (
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active
                                                ? "bg-white/10 text-white"
                                                : "bg-slate-100 text-slate-400"
                                                }`}
                                        >
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom navigation */}
                <div className="mt-auto px-4 pb-5">

                    {/* Upgrade card */}
                    <div className="relative overflow-hidden rounded-2xl bg-[#10152b] p-4 text-white">

                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#625bf0]/30 blur-2xl" />

                        <div className="relative">
                            <div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                                <Sparkles className="h-4 w-4 text-[#a9a4ff]" />
                            </div>

                            <p className="text-xs font-bold">
                                Pro workspace
                            </p>

                            <p className="mt-1 text-[10px] leading-4 text-slate-400">
                                Unlock advanced reports and unlimited invoices.
                            </p>

                            <button className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#a9a4ff]">
                                Explore plan
                                <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>
                    </div>

                    <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#10152b]">
                        <Settings className="h-[17px] w-[17px]" />
                        Settings
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#10152b]">
                        <ArrowRight className="h-[17px] w-[17px]" />
                        Sign out
                    </button>
                </div>
            </aside>

            <div className="min-h-screen lg:pl-[260px]">
                <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
                    <div className="flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">

                        {/* Mobile menu */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#10152b] shadow-sm lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        {/* Page title */}
                        <div className="hidden lg:block">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Workspace
                            </p>

                            <h1 className="mt-0.5 text-lg font-black tracking-tight">
                                Overview
                            </h1>
                        </div>

                        {/* Right actions */}
                        <div className="ml-auto flex items-center gap-2 sm:gap-3">

                            {/* Search */}
                            <button className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-400 transition hover:bg-white hover:text-slate-600 sm:flex">
                                <Search className="h-4 w-4" />
                                Search
                                <span className="ml-4 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] text-slate-400">
                                    /
                                </span>
                            </button>

                            {/* Notifications */}
                            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#10152b]">
                                <Bell className="h-[17px] w-[17px]" />

                                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#625bf0] ring-2 ring-white" />
                            </button>

                            {/* Profile */}
                            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2 transition hover:bg-slate-50">

                                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#10152b] text-[10px] font-black text-white">
                                    SK
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-[11px] font-bold text-[#10152b]">
                                        Sudheer Kumar
                                    </p>

                                    <p className="text-[9px] text-slate-400">
                                        Admin
                                    </p>
                                </div>

                                <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {/* Welcome */}
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#625bf0]/10 bg-[#625bf0]/5 px-3 py-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#625bf0]" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#625bf0]">
                                    Business overview
                                </span>
                            </div>

                            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                                Good morning, Sudheer.
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Here&apos;s what&apos;s happening with your business today.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                window.location.href = "/#demo";
                            }}
                            className="group flex w-fit items-center gap-2 rounded-xl bg-[#10152b] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-slate-300/60 transition hover:-translate-y-0.5 hover:bg-[#625bf0]"
                        >
                            <Plus className="h-4 w-4" />
                            Create invoice
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Revenue */}
                        <StatCard
                            title="Total revenue"
                            value={totalRevenue}
                            change="+12.8%"
                            description="vs. previous period"
                            icon={WalletCards}
                            positive
                        />

                        {/* Invoices */}
                        <StatCard
                            title="Invoices"
                            value="248"
                            change="+18"
                            description="this month"
                            icon={Receipt}
                            positive
                        />

                        {/* Pending */}
                        <StatCard
                            title="Pending amount"
                            value="$12,480"
                            change="8 invoices"
                            description="awaiting payment"
                            icon={Clock3}
                        />

                        {/* Customers */}
                        <StatCard
                            title="Customers"
                            value="126"
                            change="+9.4%"
                            description="growth this month"
                            icon={UserRound}
                            positive
                        />
                    </div>

                    <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
                        {/* Revenue chart */}
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">

                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                <div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Revenue
                                    </p>

                                    <div className="mt-1 flex items-end gap-3">
                                        <h3 className="text-2xl font-black tracking-tight">
                                            $84,290
                                        </h3>

                                        <span className="mb-1 flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                                            <ArrowRight className="h-3 w-3 -rotate-45" />
                                            12.8%
                                        </span>
                                    </div>
                                </div>

                                <select
                                    value={period}
                                    onChange={(event) => setPeriod(event.target.value)}
                                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[11px] font-bold text-slate-600 outline-none"
                                >
                                    <option>Last 12 months</option>
                                    <option>Last 6 months</option>
                                    <option>Last 30 days</option>
                                </select>
                            </div>

                            {/* Chart */}
                            <div className="mt-7">
                                <div className="relative h-[220px]">
                                    {/* Grid */}
                                    <div className="absolute inset-0 flex flex-col justify-between">
                                        {[0, 1, 2, 3, 4].map((line) => (
                                            <div
                                                key={line}
                                                className="border-t border-dashed border-slate-100"
                                            />
                                        ))}
                                    </div>

                                    {/* Y labels */}
                                    <div className="absolute -left-1 top-0 flex h-full -translate-x-full flex-col justify-between pr-3 text-[9px] font-medium text-slate-300">
                                        <span>$120k</span>
                                        <span>$90k</span>
                                        <span>$60k</span>
                                        <span>$30k</span>
                                        <span>$0</span>
                                    </div>

                                    {/* SVG chart */}
                                    <svg
                                        viewBox="0 0 1000 240"
                                        preserveAspectRatio="none"
                                        className="absolute inset-0 h-full w-full overflow-visible"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="revenueGradient"
                                                x1="0"
                                                x2="0"
                                                y1="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#625bf0"
                                                    stopOpacity="0.22"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#625bf0"
                                                    stopOpacity="0"
                                                />
                                            </linearGradient>
                                        </defs>

                                        <path
                                            d="
                                                M0 185
                                                C55 176, 75 155, 105 164
                                                S170 138, 205 145
                                                S260 115, 300 128
                                                S350 105, 390 113
                                                S440 84, 480 96
                                                S530 72, 570 86
                                                S625 52, 665 69
                                                S720 46, 760 58
                                                S815 30, 855 45
                                                S920 20, 1000 28
                                                L1000 240
                                                L0 240 Z
                                            "
                                            fill="url(#revenueGradient)"
                                        />

                                        <path
                                            d="
                                                M0 185
                                                C55 176, 75 155, 105 164
                                                S170 138, 205 145
                                                S260 115, 300 128
                                                S350 105, 390 113
                                                S440 84, 480 96
                                                S530 72, 570 86
                                                S625 52, 665 69
                                                S720 46, 760 58
                                                S815 30, 855 45
                                                S920 20, 1000 28
                                            "
                                            fill="none"
                                            stroke="#625bf0"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="1000"
                                            cy="28"
                                            r="6"
                                            fill="white"
                                            stroke="#625bf0"
                                            strokeWidth="4"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-8 mt-3 flex justify-between text-[9px] font-semibold text-slate-300">
                                    <span>Oct</span>
                                    <span>Nov</span>
                                    <span>Dec</span>
                                    <span>Jan</span>
                                    <span>Feb</span>
                                    <span>Mar</span>
                                    <span>Apr</span>
                                    <span>May</span>
                                    <span>Jun</span>
                                    <span>Jul</span>
                                    <span>Aug</span>
                                    <span>Sep</span>
                                </div>
                            </div>
                        </section>

                        {/* Collection summary */}
                        <section className="rounded-2xl bg-[#10152b] p-6 text-white shadow-[0_15px_40px_rgba(15,23,42,0.12)]">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Collection
                                    </p>

                                    <h3 className="mt-1 text-lg font-black">
                                        This month
                                    </h3>
                                </div>

                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                                    <WalletCards className="h-5 w-5 text-[#a9a4ff]" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-3xl font-black">
                                            $72,640
                                        </p>

                                        <p className="mt-1 text-[11px] text-slate-500">
                                            collected of $84,290
                                        </p>
                                    </div>

                                    <span className="text-sm font-black text-[#a9a4ff]">
                                        86%
                                    </span>
                                </div>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#625bf0] to-[#8b85ff]" />
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-6">

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        Paid invoices
                                    </span>

                                    <span className="text-sm font-bold">
                                        218
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        Pending
                                    </span>

                                    <span className="text-sm font-bold text-amber-300">
                                        24
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        Overdue
                                    </span>

                                    <span className="text-sm font-bold text-red-300">
                                        6
                                    </span>
                                </div>
                            </div>

                            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-bold transition hover:bg-white/15">
                                View payment report
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </section>
                    </div>

                    <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
                        {/* Recent invoices */}
                        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Billing activity
                                    </p>

                                    <h3 className="mt-1 text-lg font-black tracking-tight">
                                        Recent invoices
                                    </h3>
                                </div>

                                <button className="flex w-fit items-center gap-1.5 text-xs font-bold text-[#625bf0]">
                                    View all
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Desktop table */}
                            <div className="hidden overflow-x-auto md:block">

                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-left">
                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                                                Invoice
                                            </th>

                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                                                Customer
                                            </th>

                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                                                Date
                                            </th>

                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                                                Amount
                                            </th>

                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {invoices.map((invoice) => (
                                            <tr
                                                key={invoice.id}
                                                className="border-b border-slate-50 transition hover:bg-slate-50/60"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-bold text-[#10152b]">
                                                        {invoice.id}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#f0efff] text-[9px] font-black text-[#625bf0]">
                                                            {invoice.initials}
                                                        </div>

                                                        <div>
                                                            <p className="text-xs font-bold text-[#10152b]">
                                                                {invoice.customer}
                                                            </p>

                                                            <p className="mt-0.5 text-[10px] text-slate-400">
                                                                {invoice.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-xs font-medium text-slate-500">
                                                    {invoice.date}
                                                </td>

                                                <td className="px-4 py-4 text-xs font-black text-[#10152b]">
                                                    {invoice.amount}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge status={invoice.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="divide-y divide-slate-100 md:hidden">
                                {invoices.map((invoice) => (
                                    <div
                                        key={invoice.id}
                                        className="p-4"
                                    >
                                        <div className="flex items-center gap-3">

                                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f0efff] text-[9px] font-black text-[#625bf0]">
                                                {invoice.initials}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-bold">
                                                    {invoice.customer}
                                                </p>

                                                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                                    {invoice.id}
                                                </p>
                                            </div>

                                            <StatusBadge status={invoice.status} />
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-[10px] text-slate-400">
                                                {invoice.date}
                                            </span>

                                            <span className="text-sm font-black">
                                                {invoice.amount}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Quick actions */}
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">

                            <div>
                                <p className="text-xs font-bold text-slate-400">
                                    Shortcuts
                                </p>

                                <h3 className="mt-1 text-lg font-black tracking-tight">
                                    Quick actions
                                </h3>
                            </div>

                            <div className="mt-5 space-y-2">

                                <QuickAction
                                    icon={Plus}
                                    title="Create invoice"
                                    description="Start a new customer invoice"
                                    primary
                                />

                                <QuickAction
                                    icon={UserRound}
                                    title="Add customer"
                                    description="Save a new customer"
                                />

                                <QuickAction
                                    icon={Download}
                                    title="Export report"
                                    description="Download billing data"
                                />

                                <QuickAction
                                    icon={BarChart3}
                                    title="View analytics"
                                    description="Explore business performance"
                                />
                            </div>

                            {/* Reminder */}
                            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">

                                <div className="flex items-start gap-3">

                                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-100">
                                        <Bell className="h-4 w-4 text-amber-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black text-amber-900">
                                            Payment reminder
                                        </p>

                                        <p className="mt-1 text-[10px] leading-4 text-amber-700">
                                            8 invoices are waiting for payment.
                                        </p>

                                        <button className="mt-2 text-[10px] font-black text-amber-800">
                                            Review invoices →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row sm:items-center">
                        <p>
                            © 2026 SAC InvoicePro. All rights reserved.
                        </p>

                        <div className="flex items-center gap-3">
                            <span>Simple billing</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span>Secure workspace</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span>Built for modern businesses</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({
    title,
    value,
    change,
    description,
    icon: Icon,
    positive = false,
}: {
    title: string;
    value: string;
    change: string;
    description: string;
    icon: any;
    positive?: boolean;
}) {
    return (
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-xs font-bold text-slate-400">
                        {title}
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-tight text-[#10152b]">
                        {value}
                    </h3>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0efff] text-[#625bf0] transition group-hover:bg-[#10152b] group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${positive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                        }`}
                >
                    {positive && (
                        <span className="mr-1">
                            ↗
                        </span>
                    )}
                    {change}
                </span>

                <span className="text-[10px] font-medium text-slate-400">
                    {description}
                </span>
            </div>
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: string;
}) {
    const styles: Record<string, string> = {
        Paid: "bg-emerald-50 text-emerald-600",
        Pending: "bg-amber-50 text-amber-600",
        Overdue: "bg-red-50 text-red-500",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status] || "bg-slate-100 text-slate-500"
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${status === "Paid"
                    ? "bg-emerald-500"
                    : status === "Pending"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
            />

            {status}
        </span>
    );
}

function QuickAction({
    icon: Icon,
    title,
    description,
    primary = false,
}: {
    icon: any;
    title: string;
    description: string;
    primary?: boolean;
}) {
    return (
        <button
            className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${primary
                ? "border-[#625bf0]/15 bg-[#625bf0]/5 hover:bg-[#625bf0]/10"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
        >
            <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${primary
                    ? "bg-[#625bf0] text-white"
                    : "bg-slate-100 text-slate-500"
                    }`}
            >
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#10152b]">
                    {title}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                    {description}
                </p>
            </div>

            <ArrowRight
                className={`h-3.5 w-3.5 transition group-hover:translate-x-0.5 ${primary
                    ? "text-[#625bf0]"
                    : "text-slate-300"
                    }`}
            />
        </button>
    );
}