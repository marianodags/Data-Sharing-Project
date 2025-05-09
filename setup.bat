@echo off
REM Setup Next.js project directory structure for GitHub

REM Create main project directory
mkdir provincial-product-accounts
cd provincial-product-accounts

REM Create Next.js app structure
mkdir components pages public styles utils

REM UI Components
mkdir components\ui
echo export const Button = () => null; > components\ui\button.tsx
echo export const Input = () => null; > components\ui\input.tsx
echo export const Label = () => null; > components\ui\label.tsx
echo export const Card = () => null; > components\ui\card.tsx
echo export const Table = () => null; > components\ui\table.tsx
echo export const Select = () => null; > components\ui\select.tsx

REM Main Components
echo export default function Navbar() { return null; } > components\Navbar.tsx
echo export default function Sidebar() { return null; } > components\Sidebar.tsx
echo export default function Toast() { return null; } > components\Toast.tsx

REM Pages
echo import "@/styles/globals.css"; export default function App({ Component, pageProps }) { return <Component {...pageProps} />; } > pages\_app.tsx
echo import { useRouter } from "next/router"; export default function Home() { const router = useRouter(); router.push("/login"); return null; } > pages\index.tsx
echo import LoginPage from "@/components/LoginPage"; export default LoginPage; > pages\login.tsx
echo import Dashboard from "@/components/Dashboard"; export default Dashboard; > pages\dashboard.tsx
echo import Annex1Form from "@/components/Annex1Form"; export default Annex1Form; > pages\annex1.tsx
echo import Annex2Form from "@/components/Annex2Form"; export default Annex2Form; > pages\annex2.tsx
echo import Annex3Form from "@/components/Annex3Form"; export default Annex3Form; > pages\annex3.tsx
echo import Annex4Form from "@/components/Annex4Form"; export default Annex4Form; > pages\annex4.tsx

REM Styles
mkdir styles
echo @tailwind base; @tailwind components; @tailwind utilities; > styles\globals.css

REM Utils
mkdir utils
echo export function isAuthenticated() { return !!localStorage.getItem("user"); } > utils\auth.ts
echo export const departments = ["Mayor's Office", "Health Office", "Education Office", "Social Welfare", "Engineering Office", "Treasurer's Office", "Assessor's Office", "Planning Office", "Others"]; > utils\data.ts

REM Initialize Git repository
git init
echo node_modules/ > .gitignore
echo .next/ >> .gitignore
echo .env.local >> .gitignore

REM Create README
echo # Provincial Product Accounts System > README.md
echo A Next.js application for managing LGU data and annex forms. >> README.md

REM Install basic packages
npm init -y
npm install next react react-dom

REM Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

REM Done
echo Directory structure and initial setup complete. Ready for GitHub!
pause
