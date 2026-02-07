import { login } from '../auth/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    const params = await searchParams; // Wait for the promise

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">로그인</CardTitle>
                    <CardDescription>
                        계정에 로그인하기 위해 이메일을 입력하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {params.error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>오류</AlertTitle>
                            <AlertDescription>
                                {params.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form id="login-form" className="grid gap-4">
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
                    <Button className="w-full" form="login-form" formAction={login}>로그인</Button>
                    <div className="text-center text-sm">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="underline">
                            회원가입
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
