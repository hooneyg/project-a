
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Rocket className="h-6 w-6 text-orange-500" />
              <span className="hidden font-bold sm:inline-block">
                지선영 본부장
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">기능</a>
              <a href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">가격</a>
            </nav>
            <Button variant="default" size="sm" className="ml-4 bg-orange-500 hover:bg-orange-600">로그인</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-muted px-3 py-1 text-sm font-medium">
              🚀 1인 기업가를 위한 AI 파트너
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              혼자서도 잘해요? <br className="hidden sm:inline" />
              아니, <span className="text-orange-500">혼자서 더 잘해요.</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              기획부터 개발, 마케팅까지. AI 본부장 지선영이 든든하게 지원합니다.
              <br />
              복잡한 건 저한테 맡기시고, 대표님은 아이디어만 생각하세요.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                지금 무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                데모 보러가기
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              왜 지선영 본부장일까요?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              돈은 아끼고, 속도는 올리고, 퀄리티는 챙깁니다.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-4 text-center">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                  <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">AI 자동화</h3>
                <p className="text-sm text-muted-foreground">
                  반복 업무는 지선영이 처리합니다. 대표님은 큰 그림만 그리세요.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-4 text-center">
                <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">비용 절감 0원</h3>
                <p className="text-sm text-muted-foreground">
                  월 고정비 0원 프로젝트. 프리티어의 한계까지 꽉 짜드립니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 space-y-4 text-center">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                  <Rocket className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">초고속 배포</h3>
                <p className="text-sm text-muted-foreground">
                  아이디어 생각나면 그날 바로 런칭. 딜레이는 없습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by <span className="font-bold underline underline-offset-4">Ji Seon-Young</span>. © 2026 Project A.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
