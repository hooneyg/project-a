import { signup } from '../auth/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    const params = await searchParams; // Wait for the promise

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">회원가입</CardTitle>
                    <CardDescription>
                        새로운 계정을 생성하기 위해 정보를 입력하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {params.message && (
                        <Alert className="mb-4 bg-green-50 text-green-900 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle>성공</AlertTitle>
                            <AlertDescription>
                                {params.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    {params.error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>오류</AlertTitle>
                            <AlertDescription>
                                {params.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form id="signup-form" className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <PasswordInput id="password" name="password" required />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" form="signup-form" formAction={signup}>회원가입</Button>
                    <div className="text-center text-sm">
                        이미 계정이 있으신가요?{" "}
                        <Link href="/login" className="underline">
                            로그인
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
