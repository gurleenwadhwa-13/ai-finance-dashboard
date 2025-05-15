"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  CreditCard,
  FileUp,
  Link2,
  RefreshCw,
  Check,
  X,
  AlertCircle,
  Upload,
  Database,
  FileSpreadsheet,
  Clock,
  Plus,
} from "lucide-react"

export function DataIntegrationSection() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Sample connected banks
  const connectedBanks = [
    {
      id: "bank1",
      name: "Chase Bank",
      icon: Building,
      status: "connected",
      lastSync: "Today, 2:34 PM",
      accounts: 3,
    },
    {
      id: "bank2",
      name: "Bank of America",
      icon: Building,
      status: "connected",
      lastSync: "Today, 1:15 PM",
      accounts: 2,
    },
    {
      id: "bank3",
      name: "American Express",
      icon: CreditCard,
      status: "error",
      lastSync: "Apr 10, 2025",
      accounts: 1,
    },
  ]

  // Sample import history
  const importHistory = [
    {
      id: "import1",
      filename: "chase_transactions_apr2025.csv",
      date: "Apr 15, 2025",
      status: "success",
      records: 124,
    },
    {
      id: "import2",
      filename: "amex_transactions_mar2025.csv",
      date: "Apr 5, 2025",
      status: "success",
      records: 87,
    },
    {
      id: "import3",
      filename: "investments_q1_2025.csv",
      date: "Apr 2, 2025",
      status: "partial",
      records: 45,
      errors: 3,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Integrations</CardTitle>
          <CardDescription>Connect your financial accounts and import data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connections">
            <TabsList className="mb-4">
              <TabsTrigger value="connections">
                <Link2 className="mr-2 h-4 w-4" />
                Connections
              </TabsTrigger>
              <TabsTrigger value="import">
                <FileUp className="mr-2 h-4 w-4" />
                Import Data
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="mr-2 h-4 w-4" />
                Import History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connections">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Connected Accounts</h3>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Connection
                  </Button>
                </div>

                <div className="space-y-4">
                  {connectedBanks.map((bank) => (
                    <div key={bank.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <bank.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{bank.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {bank.accounts} account{bank.accounts > 1 ? "s" : ""} • Last synced: {bank.lastSync}
                            </p>
                          </div>
                        </div>
                        {bank.status === "connected" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Connection Error
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-3 w-3" />
                          Sync Now
                        </Button>
                        {bank.status === "error" && <Button size="sm">Reconnect</Button>}
                        <Button variant="outline" size="sm">
                          <X className="mr-2 h-3 w-3" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-dashed p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Link2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Connect a Financial Institution</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Securely connect your bank accounts, credit cards, and investment accounts.
                    </p>
                    <div className="mt-4">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Connection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="import">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Import Financial Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload CSV files from your financial institutions to import transactions and account data.
                  </p>
                </div>

                <Tabs defaultValue="csv">
                  <TabsList>
                    <TabsTrigger value="csv">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      CSV Import
                    </TabsTrigger>
                    <TabsTrigger value="quiltt">
                      <Database className="mr-2 h-4 w-4" />
                      Quiltt Integration
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="csv" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="file-type">File Type</Label>
                            <select
                              id="file-type"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                              <option value="transactions">Transactions CSV</option>
                              <option value="accounts">Accounts CSV</option>
                              <option value="investments">Investments CSV</option>
                              <option value="budget">Budget CSV</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="account">Associated Account</Label>
                            <select
                              id="account"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                              <option value="">Select an account</option>
                              <option value="chase">Chase Checking</option>
                              <option value="bofa">Bank of America Savings</option>
                              <option value="amex">American Express</option>
                            </select>
                          </div>

                          <div className="rounded-lg border border-dashed p-6">
                            <div className="flex flex-col items-center justify-center text-center">
                              <div className="rounded-full bg-primary/10 p-3">
                                <Upload className="h-6 w-6 text-primary" />
                              </div>
                              <h3 className="mt-4 text-lg font-medium">Upload CSV File</h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Drag and drop your CSV file here, or click to browse
                              </p>
                              <div className="mt-4">
                                <Button onClick={handleFileUpload}>
                                  <FileUp className="mr-2 h-4 w-4" />
                                  Select File
                                </Button>
                              </div>
                            </div>
                          </div>

                          {isUploading && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Uploading...</span>
                                <span className="text-sm">{uploadProgress}%</span>
                              </div>
                              <Progress value={uploadProgress} className="h-2" />
                            </div>
                          )}

                          <div className="rounded-md bg-muted p-4">
                            <h4 className="mb-2 font-medium">CSV Format Requirements</h4>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                              <li>File must be in CSV format</li>
                              <li>First row should contain column headers</li>
                              <li>Required columns: Date, Description, Amount</li>
                              <li>Date format should be MM/DD/YYYY</li>
                              <li>Amount should be positive for income, negative for expenses</li>
                            </ul>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button disabled={!isUploading && uploadProgress !== 100}>Import Data</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="quiltt" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Database className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Quiltt Integration</h3>
                              <p className="text-sm text-muted-foreground">
                                Connect securely to thousands of financial institutions
                              </p>
                            </div>
                          </div>

                          <div className="rounded-md bg-muted p-4">
                            <h4 className="mb-2 font-medium">About Quiltt</h4>
                            <p className="text-sm text-muted-foreground">
                              Quiltt provides secure access to financial data from thousands of banks, credit cards, and
                              investment accounts. Connect once and automatically sync your transactions and balances.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="quiltt-connection-type">Connection Type</Label>
                            <select
                              id="quiltt-connection-type"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                              <option value="banking">Banking & Credit Cards</option>
                              <option value="investments">Investment Accounts</option>
                              <option value="all">All Financial Accounts</option>
                            </select>
                          </div>

                          <div className="flex justify-end">
                            <Button>
                              <Link2 className="mr-2 h-4 w-4" />
                              Connect with Quiltt
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Import History</h3>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 font-medium">
                        <th className="py-3 pl-4 text-left">File Name</th>
                        <th className="py-3 text-left">Date</th>
                        <th className="py-3 text-left">Records</th>
                        <th className="py-3 text-left">Status</th>
                        <th className="py-3 pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importHistory.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 pl-4">{item.filename}</td>
                          <td>{item.date}</td>
                          <td>{item.records} records</td>
                          <td>
                            {item.status === "success" ? (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                <Check className="mr-1 h-3 w-3" />
                                Success
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              >
                                <AlertCircle className="mr-1 h-3 w-3" />
                                Partial ({item.errors} errors)
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 pr-4 text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your imported financial data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Backup</h4>
                <p className="text-sm text-muted-foreground">Export all your financial data for backup</p>
              </div>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Cleanup</h4>
                <p className="text-sm text-muted-foreground">Remove duplicate transactions and fix categorization</p>
              </div>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Cleanup
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Deletion</h4>
                <p className="text-sm text-muted-foreground">Permanently delete selected financial data</p>
              </div>
              <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                <X className="mr-2 h-4 w-4" />
                Delete Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
