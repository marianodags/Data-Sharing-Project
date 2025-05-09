'use client'

import { useEffect, useState } from 'react'
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table"
import { Home, Settings, LogOut, FileText, ChevronRight, AlertCircle } from "lucide-react"

type LGUStatus = {
  id: string
  name: string
  annex1: 'pending' | 'completed' | 'not-started'
  annex2: 'pending' | 'completed' | 'not-started'
  annex3: 'pending' | 'completed' | 'not-started'
  annex4: 'pending' | 'completed' | 'not-started'
  lastUpdated: string
}

type User = {
  username: string
  lgu: string
  role: 'admin' | 'user'
}

export default function PPASystem() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'annex1' | 'annex2' | 'annex3' | 'annex4'>('dashboard')

  const [lgus] = useState<LGUStatus[]>([
    {
      id: '1',
      name: 'Quezon City',
      annex1: 'completed',
      annex2: 'completed',
      annex3: 'pending',
      annex4: 'not-started',
      lastUpdated: '2023-06-15'
    },
    {
      id: '2',
      name: 'Makati City',
      annex1: 'completed',
      annex2: 'pending',
      annex3: 'not-started',
      annex4: 'not-started',
      lastUpdated: '2023-06-10'
    },
    {
      id: '3',
      name: 'Manila City',
      annex1: 'completed',
      annex2: 'completed',
      annex3: 'completed',
      annex4: 'pending',
      lastUpdated: '2023-06-18'
    },
    {
      id: '4',
      name: 'Taguig City',
      annex1: 'pending',
      annex2: 'not-started',
      annex3: 'not-started',
      annex4: 'not-started',
      lastUpdated: '2023-06-05'
    }
  ])

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple authentication - replace with real API call in production
    if (username === 'admin' && password === 'ppa123') {
      const userData = { 
        username, 
        lgu: 'Quezon City', 
        role: 'admin' as const 
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setError('')
    } else if (username === 'user' && password === 'ppa123') {
      const userData = { 
        username, 
        lgu: 'Makati City', 
        role: 'user' as const 
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setError('')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setUsername('')
    setPassword('')
    setActiveTab('dashboard')
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full"
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Not Started</span>
    }
  }

  // Show login screen if no user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Provincial Product Accounts</CardTitle>
            <CardDescription>Login to your LGU account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main application after login
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white p-2 rounded">
              <span className="font-bold">PSA</span>
            </div>
            <h1 className="text-xl font-bold">Provincial Product Accounts</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {['annex1', 'annex2', 'annex3', 'annex4'].map((annex) => (
              <button
                key={annex}
                onClick={() => setActiveTab(annex as any)}
                className={`flex items-center space-x-1 ${
                  activeTab === annex ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{annex.replace('annex', 'Annex ')}</span>
              </button>
            ))}
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 flex items-center space-x-1"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">LGU Process Status</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Export Data</Button>
                <Button>Refresh Data</Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">LGU Name</TableHead>
                      <TableHead>Annex 1</TableHead>
                      <TableHead>Annex 2</TableHead>
                      <TableHead>Annex 3</TableHead>
                      <TableHead>Annex 4</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lgus
                      .filter(lgu => user.role === 'admin' || lgu.name === user.lgu)
                      .map((lgu) => (
                        <TableRow key={lgu.id}>
                          <TableCell className="font-medium">{lgu.name}</TableCell>
                          <TableCell>{getStatusBadge(lgu.annex1)}</TableCell>
                          <TableCell>{getStatusBadge(lgu.annex2)}</TableCell>
                          <TableCell>{getStatusBadge(lgu.annex3)}</TableCell>
                          <TableCell>{getStatusBadge(lgu.annex4)}</TableCell>
                          <TableCell>{lgu.lastUpdated}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View Details <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {activeTab.toUpperCase()} Form
              </CardTitle>
              <CardDescription>
                {user.lgu} - {activeTab.replace('annex', 'Annex ')} Data Entry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {activeTab.toUpperCase()} Data Entry
                </h3>
                <p className="mt-1 text-gray-500">
                  This form would collect data for {activeTab.replace('annex', 'Annex ')} from {user.lgu}.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setActiveTab('dashboard')}>
                    <Home className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Provincial Product Accounts System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

// Missing Label component definition - adding it here
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  )
}