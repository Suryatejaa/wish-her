module.exports = [
"[project]/src/data/quiz.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":1,"question":"You love this sport right, me too. Will you be by my side to watch next coming matches live?","image":"/images/cricket.jpeg","options":["Yes","Definitely yes"]},{"id":2,"question":"You love Dhoni, and I love virat. Together we will have 6 IPL tropies 😉","image":"/images/msd.avif","options":["Haha","😏😒"]},{"id":3,"question":"I know you love Kalyan Babu and I love mahesh babu but still we can enjoy their movies together in RTC X Roads!!! Em antav?","image":"/images/pspk.jpg","options":["Yes, We will ✨","I can't wait! 🎁"]}]);}),
"[project]/src/components/SectionQuiz.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionQuiz
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$quiz$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/quiz.json (json)");
"use client";
;
;
;
;
function SectionQuiz() {
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFinished, setIsFinished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [touchStartX, setTouchStartX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleTouchStart = (e)=>{
        setTouchStartX(e.touches[0].clientX);
    };
    const handleTouchMove = (e)=>{
        if (touchStartX === null) return;
        const currentX = e.touches[0].clientX;
        const diff = touchStartX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && activeIndex < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$quiz$2e$json__$28$json$29$__["default"].length - 1) {
                // Swipe left -> next
                setActiveIndex((prev)=>prev + 1);
                setTouchStartX(null);
            } else if (diff < 0 && activeIndex > 0) {
                // Swipe right -> prev
                setActiveIndex((prev)=>prev - 1);
                setTouchStartX(null);
            }
        }
    };
    const handleTouchEnd = ()=>{
        setTouchStartX(null);
    };
    const handleOptionClick = ()=>{
        if (activeIndex < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$quiz$2e$json__$28$json$29$__["default"].length - 1) {
            setActiveIndex((prev)=>prev + 1);
        } else {
            setIsFinished(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "quiz-carousel",
        className: "min-h-screen py-16 w-full flex flex-col justify-center items-center relative z-10 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out",
                style: {
                    background: "radial-gradient(circle at 50% 50%, rgba(253,242,248,0.8) 0%, rgba(243,232,255,0.4) 100%)",
                    filter: "blur(40px)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/SectionQuiz.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full relative h-[500px] flex items-center justify-center overflow-visible",
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$quiz$2e$json__$28$json$29$__["default"].map((item, index)=>{
                    // Calculate the offset from the active index
                    const offset = index - activeIndex;
                    // Compute styles based on offset for a 3D carousel effect
                    const isActive = offset === 0;
                    const isVisible = Math.abs(offset) <= 1; // Only render immediate neighbors
                    if (!isVisible) return null;
                    const translateX = offset * 95; // % - Slightly overlapping the edge to be visible
                    const scale = isActive ? 1.05 : 0.85;
                    const opacity = isActive ? 1 : 0.4;
                    const zIndex = isActive ? 20 : 10;
                    const blur = isActive ? 0 : 4; // Blur neighbors for depth
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[85%] max-w-[320px] rounded-3xl p-8 shadow-xl flex flex-col items-center gap-6 ${isActive ? "glass bg-white/40" : "bg-white/20"}`,
                        style: {
                            transform: `translateX(${translateX}%) scale(${scale})`,
                            opacity: opacity,
                            zIndex: zIndex,
                            filter: `blur(${blur}px)`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full relative rounded-2xl overflow-hidden shadow-sm",
                                style: {
                                    paddingBottom: '55%'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.image,
                                    alt: item.question,
                                    className: "absolute inset-0 object-cover w-full h-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SectionQuiz.tsx",
                                    lineNumber: 99,
                                    columnNumber: 18
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SectionQuiz.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-medium text-center text-[var(--text-primary)] leading-tight h-16 flex items-center justify-center px-1",
                                children: item.question
                            }, void 0, false, {
                                fileName: "[project]/src/components/SectionQuiz.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex justify-center gap-4  pb-6 rounded-b-3xl",
                                children: item.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (isActive) handleOptionClick();
                                        },
                                        disabled: !isActive,
                                        className: " text-lg rounded-full border-2 border-gray-300 text-[var(--text-primary)] transition-all active:scale-95 flex-1 max-w-[140px]",
                                        children: opt
                                    }, i, false, {
                                        fileName: "[project]/src/components/SectionQuiz.tsx",
                                        lineNumber: 114,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/SectionQuiz.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/SectionQuiz.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/SectionQuiz.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-6 transition-all duration-1000 flex flex-col items-center ${isFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "italic text-[var(--text-secondary)] mb-6",
                        children: "Perfect score. ✨"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SectionQuiz.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/birthday",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "glass-button text-sm px-8 py-3 bg-white/60",
                            children: "Open your next surprise"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SectionQuiz.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SectionQuiz.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SectionQuiz.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SectionQuiz.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_8f3e056f._.js.map