"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  Filter,
  RefreshCw,
  Users,
  XCircle,
} from "lucide-react";

type TaskCategory =
  | "전체"
  | "위험성평가"
  | "안전점검"
  | "법정의무"
  | "안전교육"
  | "사고조치"
  | "일반업무";

const categories: TaskCategory[] = [
  "전체",
  "위험성평가",
  "안전점검",
  "법정의무",
  "안전교육",
  "사고조치",
  "일반업무",
];

const tasks = [
  { title: "3월 위험성평가 업데이트", team: "안전보건팀", category: "위험성평가" as const, due: "D-3" },
  { title: "소화기 월간 점검", team: "자산관리팀", category: "안전점검" as const, due: "D-1" },
  { title: "정기 안전교육 이수 확인", team: "총무관리팀", category: "안전교육" as const, due: "D-5" },
  { title: "협력사 계약서 정리", team: "총무관리팀", category: "일반업무" as const, due: "D-7" },
  { title: "아차사고 후속 조치 등록", team: "안전보건팀", category: "사고조치" as const, due: "기한초과" },
  { title: "작업환경측정 일정 관리", team: "안전보건팀", category: "법정의무" as const, due: "D-30" },
];

const categoryColor: Record<Exclude<TaskCategory, "전체">, string> = {
  위험성평가: "bg-rose-500/20 text-rose-200",
  안전점검: "bg-cyan-500/20 text-cyan-200",
  법정의무: "bg-violet-500/20 text-violet-200",
  안전교육: "bg-emerald-500/20 text-emerald-200",
  사고조치: "bg-amber-500/20 text-amber-200",
  일반업무: "bg-slate-500/30 text-slate-200",
};

const doneItems = [
  "Bell 알림(API/Hook/UI) + 기한초과·D-7·팀지연 유형 반영",
  "Department API를 departmentId 기준으로 변경(동일 부서 자동 집계, 인원수 추가)",
  "부서 현황 페이지 요약 카드 5개 + 팀 카드 인원 표시",
  "Task category 컬럼 추가(SQL 반영), 생성/수정 폼 카테고리 선택 UI 적용",
  "Task 목록 카테고리 배지 표시 + 대시보드 30초 폴링·수동 새로고침 적용",
];

const weakItems = [
  {
    feature: "부서 현황 — 팀 연결",
    issue: "DB 팀-부서 연결 누락 시 ‘내가 속한 팀’ 폴백으로 정확도 저하",
    action: "팀 master 데이터 입력 강제 + 연결 누락 점검 배치",
  },
  {
    feature: "Task 카테고리 필터",
    issue: "배지 표시는 있으나 필터 UI 부재",
    action: "목록/칸반/캘린더 공통 필터 컴포넌트 도입",
  },
  {
    feature: "Bell 알림 — 법정의무",
    issue: "일반 dueDate 기준만 지원",
    action: "법정의무 전용 모델 + 주기 생성 로직 추가",
  },
  {
    feature: "칸반/캘린더 카테고리",
    issue: "task.category가 뷰에 노출되지 않음",
    action: "카드 badge/색상 + 카테고리 스윔레인 반영",
  },
];

const missingItems = [
  "법정의무 관리 모델(주기 기반 자동 기한 생성)",
  "사고/아차사고 자체 보고(사내 데이터 기록형)",
  "안전교육 이수 관리(대상·이수율·미이수 추적)",
  "팀 온보딩 UI(셀프 팀 생성·멤버 초대)",
  "보고서 내보내기(PDF/Excel)",
  "타팀용 사이드바 커스터마이징",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>("전체");
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev === 1 ? 30 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredTasks = useMemo(() => {
    if (selectedCategory === "전체") return tasks;
    return tasks.filter((task) => task.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs text-slate-400">통합 업무공유플랫폼</p>
            <h1 className="text-lg font-bold">구현 상태 점검 대시보드 (총무관리부 통합)</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-900">총무관리팀</button>
            <button className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-900">자산관리팀</button>
            <button className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-emerald-200">
              안전보건팀
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-12">
        <section className="rounded-2xl border border-emerald-700/40 bg-emerald-900/10 p-5 lg:col-span-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-300" />
              <h2 className="font-semibold">실시간 모니터링</h2>
            </div>
            <button
              onClick={() => setSecondsLeft(30)}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
            >
              <RefreshCw className="h-4 w-4" /> 수동 새로고침
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <CalendarClock className="h-4 w-4 text-emerald-300" />
            <span>자동 폴링 주기: 30초</span>
            <span>다음 갱신까지 {secondsLeft}초</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-emerald-400 transition-all"
              style={{ width: `${((30 - secondsLeft) / 30) * 100}%` }}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-700/30 bg-slate-900/60 p-6 lg:col-span-4">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            <h2 className="font-semibold">✅ 완료</h2>
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {doneItems.map((item) => (
              <li key={item} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-amber-600/30 bg-slate-900/60 p-6 lg:col-span-4">
          <div className="mb-4 flex items-center gap-2">
            <CircleDashed className="h-5 w-5 text-amber-300" />
            <h2 className="font-semibold">⚠️ 구현 미흡</h2>
          </div>
          <div className="space-y-3 text-sm">
            {weakItems.map((item) => (
              <article key={item.feature} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                <p className="font-medium text-slate-100">{item.feature}</p>
                <p className="mt-1 text-slate-300">문제: {item.issue}</p>
                <p className="mt-1 text-amber-200">개선: {item.action}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-rose-700/30 bg-slate-900/60 p-6 lg:col-span-4">
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-300" />
            <h2 className="font-semibold">❌ 미구현</h2>
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {missingItems.map((item) => (
              <li key={item} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-sky-300" />
              <h2 className="font-semibold">Task 카테고리 필터 (요청 반영)</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Users className="h-4 w-4" /> 총 {filteredTasks.length}건 표시
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1.5 text-sm border ${
                  selectedCategory === category
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                    : "border-slate-700 bg-slate-950 text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.map((task) => (
              <article key={task.title} className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
                <p className="font-semibold">{task.title}</p>
                <p className="mt-1 text-slate-400">{task.team}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2 py-1 text-xs ${categoryColor[task.category]}`}>{task.category}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-200">
                    <AlertTriangle className="h-3.5 w-3.5" /> {task.due}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
