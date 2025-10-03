import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BarChart3, Download, Calendar, Users, Building, Shield, TrendingUp, Star, Flag, ChevronUp, ChevronLeft, ChevronDown, ChevronRight, FileText, Globe, User, Clock, Hash, AlertCircle } from 'lucide-react';

const PatentAnalysis = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [patents, setPatents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPatents, setTotalPatents] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatents, setFilteredPatents] = useState([]);
    const [error, setError] = useState('');

    const loadPatents = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const startIndex = page * 100;
            console.log(`Fetching patents from: http://localhost:5000/api/patents/${startIndex}`);
            
            const response = await fetch(`http://localhost:5000/api/patents/${startIndex}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response received:', data);
            
            if (data && data.data) {
                setPatents(data.data);
                setTotalPatents(data.total || data.data.length);
                setFilteredPatents(data.data);
                console.log(`Loaded ${data.data.length} patents`);
            } else {
                throw new Error('No patent data found in response');
            }
        } catch (error) {
            console.error('Error loading patents:', error);
            setError(`Failed to load patents: ${error.message}`);
            
            // Fallback to empty array to prevent crashes
            setPatents([]);
            setFilteredPatents([]);
            setTotalPatents(0);
        } finally {
            setLoading(false);
        }
    };

    // Search and filter patents
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredPatents(patents);
            return;
        }

        const filtered = patents.filter(patent => {
            const searchLower = term.toLowerCase();
            return (
                patent.biblio?.invention_title?.some(title => 
                    title.text?.toLowerCase().includes(searchLower)
                ) ||
                patent.biblio?.parties?.applicants?.some(applicant => 
                    applicant.extracted_name?.value?.toLowerCase().includes(searchLower)
                ) ||
                patent.biblio?.parties?.inventors?.some(inventor => 
                    inventor.extracted_name?.value?.toLowerCase().includes(searchLower)
                ) ||
                patent.jurisdiction?.toLowerCase().includes(searchLower) ||
                patent.abstract?.some(abs => 
                    abs.text?.toLowerCase().includes(searchLower)
                ) ||
                patent.doc_number?.toLowerCase().includes(searchLower)
            );
        });
        setFilteredPatents(filtered);
    };

    // Pagination
    const nextPage = () => {
        const nextPageNum = currentPage + 1;
        setCurrentPage(nextPageNum);
        loadPatents(nextPageNum);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            const prevPageNum = currentPage - 1;
            setCurrentPage(prevPageNum);
            loadPatents(prevPageNum);
        }
    };

    // Load initial data
    useEffect(() => {
        loadPatents(1); // Start with page 1 (which fetches /api/patents/100)
    }, []);

    // Patent Dropdown Card Component
    const PatentDropdownCard = ({ patent }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        
        const title = patent.biblio?.invention_title?.find(t => t.lang === 'en')?.text || 
                     patent.biblio?.invention_title?.[0]?.text || 
                     'No Title Available';
        
        const abstract = patent.abstract?.find(a => a.lang === 'en')?.text || 
                        patent.abstract?.[0]?.text || 
                        'No abstract available';
        
        const applicants = patent.biblio?.parties?.applicants || [];
        const inventors = patent.biblio?.parties?.inventors || [];
        const classifications = patent.biblio?.classifications_ipcr?.classifications || [];
        const agents = patent.biblio?.parties?.agents || [];

        return (
            <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm hover:border-blue-400/50 transition-all">
                {/* Header - Always Visible */}
                <div 
                    className="p-4 cursor-pointer hover:bg-slate-700/40 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                                    {patent.jurisdiction || 'N/A'}
                                </Badge>
                                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-400/30">
                                    {patent.doc_number || 'N/A'}
                                </Badge>
                                {patent.kind && (
                                    <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                        {patent.kind}
                                    </Badge>
                                )}
                                {patent.legal_status?.patent_status && (
                                    <Badge variant="outline" className={
                                        patent.legal_status.patent_status === 'GRANTED' 
                                            ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                            : patent.legal_status.patent_status === 'PENDING'
                                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                                            : 'bg-slate-700/50 text-blue-300 border-blue-400/30'
                                    }>
                                        {patent.legal_status.patent_status}
                                    </Badge>
                                )}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                {title}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-sm text-blue-300">
                                <span className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    {applicants[0]?.extracted_name?.value || 'Unknown Applicant'}
                                    {applicants.length > 1 && ` +${applicants.length - 1} more`}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {patent.date_published || 'Date N/A'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {inventors.length} inventor{inventors.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                        
                        {/* Expand/Collapse Button */}
                        <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                                {isExpanded ? 'Hide Details' : 'Show Details'}
                            </Badge>
                            <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                    <CardContent className="pt-0 space-y-4 border-t border-blue-500/30">
                        {/* Abstract */}
                        <div>
                            <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4" />
                                Abstract
                            </Label>
                            <p className="text-blue-200 text-sm leading-relaxed">
                                {abstract}
                            </p>
                        </div>

                        {/* Applicants Section */}
                        {applicants.length > 0 && (
                            <div>
                                <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4" />
                                    Applicants ({applicants.length})
                                </Label>
                                <div className="space-y-2">
                                    {applicants.map((applicant, index) => (
                                        <div key={index} className="text-blue-200 text-sm">
                                            <div className="font-medium">{applicant.extracted_name?.value || 'Unknown Applicant'}</div>
                                            {applicant.residence && (
                                                <div className="text-xs text-blue-300">Residence: {applicant.residence}</div>
                                            )}
                                            {applicant.extracted_address && (
                                                <div className="text-xs text-blue-300">{applicant.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inventors Section */}
                        {inventors.length > 0 && (
                            <div>
                                <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4" />
                                    Inventors ({inventors.length})
                                </Label>
                                <div className="space-y-2">
                                    {inventors.map((inventor, index) => (
                                        <div key={index} className="text-blue-200 text-sm">
                                            <div className="font-medium">{inventor.extracted_name?.value || 'Unknown Inventor'}</div>
                                            {inventor.residence && (
                                                <div className="text-xs text-blue-300">Residence: {inventor.residence}</div>
                                            )}
                                            {inventor.extracted_address && (
                                                <div className="text-xs text-blue-300">{inventor.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Agents Section */}
                        {agents.length > 0 && (
                            <div>
                                <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4" />
                                    Agents ({agents.length})
                                </Label>
                                <div className="space-y-2">
                                    {agents.map((agent, index) => (
                                        <div key={index} className="text-blue-200 text-sm">
                                            <div className="font-medium">{agent.extracted_name?.value || 'Unknown Agent'}</div>
                                            {agent.extracted_address && (
                                                <div className="text-xs text-blue-300">{agent.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Classifications Section */}
                        {classifications.length > 0 && (
                            <div>
                                <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                    <Hash className="w-4 h-4" />
                                    IPC Classifications ({classifications.length})
                                </Label>
                                <div className="flex flex-wrap gap-1">
                                    {classifications.map((classification, index) => (
                                        <Badge 
                                            key={index} 
                                            variant="secondary" 
                                            className="bg-blue-500/20 text-blue-300 text-xs border-blue-400/30"
                                        >
                                            {classification.symbol || 'N/A'}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Patent Families */}
                        {patent.families && (
                            <div>
                                <Label className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
                                    <Globe className="w-4 h-4" />
                                    Patent Family
                                </Label>
                                <div className="text-blue-200 text-sm space-y-1">
                                    <div>Simple Family: {patent.families.simple_family?.size || 0} members</div>
                                    {patent.families.extended_family && (
                                        <div>Extended Family: {patent.families.extended_family.size} members</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Document Info */}
                        <div className="pt-2 border-t border-blue-500/30">
                            <div className="text-xs text-blue-400 space-y-1">
                                <div>Lens ID: {patent.lens_id || 'N/A'}</div>
                                <div>Document Key: {patent.doc_key || 'N/A'}</div>
                                {patent.lang && <div>Language: {patent.lang}</div>}
                            </div>
                        </div>

                        {/* Collapse Button */}
                        <div className="flex justify-center pt-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsExpanded(false)}
                                className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                            >
                                <ChevronUp className="w-4 h-4 mr-2" />
                                Collapse Details
                            </Button>
                        </div>
                    </CardContent>
                )}
            </Card>
        );
    };

    // Statistics Cards
    const StatCard = ({ title, value, icon, description }) => (
        <Card className="bg-gradient-to-br from-slate-800/60 to-blue-900/60 border-blue-500/30 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-300 text-sm font-medium">{title}</p>
                        <p className="text-2xl font-bold text-white mt-1">{value}</p>
                        {description && (
                            <p className="text-blue-300 text-xs mt-1">{description}</p>
                        )}
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-full border border-blue-500/30">
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Quick Stats
    const getQuickStats = () => {
        const jurisdictions = new Set(patents.map(p => p.jurisdiction).filter(Boolean));
        const applicants = new Set();
        const inventors = new Set();
        
        patents.forEach(patent => {
            patent.biblio?.parties?.applicants?.forEach(app => {
                if (app.extracted_name?.value) applicants.add(app.extracted_name.value);
            });
            patent.biblio?.parties?.inventors?.forEach(inv => {
                if (inv.extracted_name?.value) inventors.add(inv.extracted_name.value);
            });
        });

        return {
            total: totalPatents.toLocaleString(),
            jurisdictions: jurisdictions.size,
            applicants: applicants.size,
            inventors: inventors.size,
            currentBatch: patents.length,
            currentPage: currentPage,
            startIndex: currentPage * 100
        };
    };

    const stats = getQuickStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-400 mb-3 transform -skew-x-6">
                        Patent Intelligence Dashboard
                    </h1>
                    <p className="text-blue-300 text-lg">
                        Advanced patent analysis and technology intelligence platform
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Card className="mb-6 border-red-500/30 bg-red-500/20 backdrop-blur-sm">
                        <CardContent className="p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <div className="text-red-300 text-sm">
                                {error}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Search Section */}
                <Card className="mb-8 border-blue-500/30 bg-slate-800/40 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Search patents by title, applicant, inventor, jurisdiction, or document number..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="flex-1 border-blue-500/30 bg-slate-700/50 text-white placeholder-blue-300 focus:border-blue-400"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                            />
                            <Button 
                                onClick={() => handleSearch(searchTerm)}
                                className="bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                            <Button 
                                onClick={() => setSearchTerm('')}
                                variant="outline"
                                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                            >
                                Clear
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 p-1 backdrop-blur-sm border border-blue-500/30">
                        <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="patents" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300">
                            <FileText className="w-4 h-4 mr-2" />
                            Patents ({filteredPatents.length})
                        </TabsTrigger>
                        <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300">
                            <Filter className="w-4 h-4 mr-2" />
                            Analysis
                        </TabsTrigger>
                        <TabsTrigger value="export" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </TabsTrigger>
                    </TabsList>

                    {/* Dashboard Tab */}
                    <TabsContent value="dashboard" className="space-y-6">
                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <StatCard
                                title="Total Patents"
                                value={stats.total}
                                description="In database"
                                icon={<FileText className="w-6 h-6 text-blue-300" />}
                            />
                            <StatCard
                                title="Jurisdictions"
                                value={stats.jurisdictions}
                                description="Countries/Regions"
                                icon={<Globe className="w-6 h-6 text-blue-300" />}
                            />
                            <StatCard
                                title="Applicants"
                                value={stats.applicants}
                                description="Unique organizations"
                                icon={<Building className="w-6 h-6 text-blue-300" />}
                            />
                            <StatCard
                                title="Inventors"
                                value={stats.inventors}
                                description="Unique inventors"
                                icon={<Users className="w-6 h-6 text-blue-300" />}
                            />
                        </div>

                        {/* Page Info */}
                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="text-blue-300 text-sm">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <span className="font-semibold">Current Page:</span> {stats.currentPage}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Start Index:</span> {stats.startIndex}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Current Batch:</span> {stats.currentBatch} patents
                                        </div>
                                        {/* <div>
                                            <span className="font-semibold">API Endpoint:</span> /api/patents/{stats.startIndex}
                                        </div> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Patents Preview */}
                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-blue-400 flex items-center justify-between">
                                    <span>Recent Patents Preview</span>
                                    <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                                        Showing {stats.currentBatch} patents
                                    </Badge>
                                </CardTitle>
                                <CardDescription className="text-blue-300">
                                    Loaded from API endpoint: /api/patents/{stats.startIndex}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {patents.length > 0 ? (
                                    <div className="grid gap-4">
                                        {patents.slice(0, 3).map((patent, index) => {
                                            const title = patent.biblio?.invention_title?.find(t => t.lang === 'en')?.text || 'No Title';
                                            return (
                                                <div key={index} className="p-4 border border-blue-500/30 rounded-lg bg-slate-700/40 backdrop-blur-sm">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-white mb-1 line-clamp-2">
                                                                {title}
                                                            </h4>
                                                            <p className="text-blue-200 text-sm line-clamp-2">
                                                                {patent.abstract?.find(a => a.lang === 'en')?.text?.substring(0, 150)}...
                                                            </p>
                                                            <div className="flex items-center gap-4 mt-2 text-xs text-blue-300">
                                                                <span className="flex items-center gap-1">
                                                                    <Building className="w-3 h-3" />
                                                                    {patent.biblio?.parties?.applicants?.[0]?.extracted_name?.value || 'N/A'}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Globe className="w-3 h-3" />
                                                                    {patent.jurisdiction}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {patent.date_published}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center p-8 text-blue-400">
                                        No patents loaded. Click "Refresh Data" to load patents.
                                    </div>
                                )}
                                <Button 
                                    onClick={() => setActiveTab('patents')}
                                    variant="outline" 
                                    className="w-full mt-4 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                                >
                                    View All Patents
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Patents Tab */}
                    <TabsContent value="patents" className="space-y-6">
                        {/* Pagination Controls */}
                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-300">
                                        <div className="font-semibold">
                                            Showing {filteredPatents.length} patents 
                                            {searchTerm && ` (filtered from ${patents.length})`}
                                        </div>
                                        <div className="text-blue-400 text-sm">
                                            Page {currentPage} • Start Index: {currentPage * 100} • Total in DB: {totalPatents.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={prevPage}
                                            disabled={currentPage === 1 || loading}
                                            variant="outline"
                                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Previous
                                        </Button>
                                        <Button
                                            onClick={nextPage}
                                            disabled={loading}
                                            variant="outline"
                                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                        <Button
                                            onClick={() => loadPatents(currentPage)}
                                            disabled={loading}
                                            variant="outline"
                                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                                        >
                                            {loading ? 'Loading...' : 'Refresh Data'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Patents Grid */}
                        {loading ? (
                            <Card className="text-center p-8 border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                                <CardContent>
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                        Loading Patents...
                                    </h3>
                                    <p className="text-blue-400">
                                        Fetching data from http://localhost:5000/api/patents/{currentPage * 100}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : filteredPatents.length > 0 ? (
                            <div className="space-y-4">
                                {filteredPatents.map((patent, index) => (
                                    <PatentDropdownCard key={`${patent.lens_id}-${index}`} patent={patent} />
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center p-8 border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                                <CardContent>
                                    <Search className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                        {searchTerm ? 'No matching patents found' : 'No patents available'}
                                    </h3>
                                    <p className="text-blue-400">
                                        {searchTerm 
                                            ? 'Try adjusting your search terms'
                                            : 'Click "Refresh Data" to load patents from the API'
                                        }
                                    </p>
                                    {!searchTerm && (
                                        <Button 
                                            onClick={() => loadPatents(currentPage)}
                                            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white"
                                        >
                                            Load Patents
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Analysis Tab */}
                    <TabsContent value="analysis">
                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-blue-400">Patent Analysis</CardTitle>
                                <CardDescription className="text-blue-300">
                                    Analytics and insights from the current patent batch
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {patents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                                            <CardHeader>
                                                <CardTitle className="text-blue-400 text-lg">Jurisdiction Distribution</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {Array.from(new Set(patents.map(p => p.jurisdiction).filter(Boolean))).map(jurisdiction => (
                                                        <div key={jurisdiction} className="flex justify-between items-center">
                                                            <span className="text-blue-300">{jurisdiction}</span>
                                                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                                                                {patents.filter(p => p.jurisdiction === jurisdiction).length}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                                            <CardHeader>
                                                <CardTitle className="text-blue-400 text-lg">Top Applicants</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {(() => {
                                                        const applicantCount = {};
                                                        patents.forEach(patent => {
                                                            patent.biblio?.parties?.applicants?.forEach(applicant => {
                                                                const name = applicant.extracted_name?.value;
                                                                if (name) {
                                                                    applicantCount[name] = (applicantCount[name] || 0) + 1;
                                                                }
                                                            });
                                                        });
                                                        
                                                        return Object.entries(applicantCount)
                                                            .sort(([,a], [,b]) => b - a)
                                                            .slice(0, 8)
                                                            .map(([applicant, count]) => (
                                                                <div key={applicant} className="flex justify-between items-center">
                                                                    <span className="text-blue-300 text-sm truncate" title={applicant}>
                                                                        {applicant}
                                                                    </span>
                                                                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                                                                        {count}
                                                                    </Badge>
                                                                </div>
                                                            ));
                                                    })()}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 text-blue-400">
                                        Load patents first to see analysis
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Export Tab */}
                    <TabsContent value="export">
                        <Card className="border-blue-500/30 bg-slate-800/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-blue-400">Export & Download</CardTitle>
                                <CardDescription className="text-blue-300">
                                    Export patent data for further analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-20 flex-col border border-blue-500/30">
                                        <Download className="w-6 h-6 mb-2" />
                                        Export to CSV
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-20 flex-col border border-blue-500/30">
                                        <FileText className="w-6 h-6 mb-2" />
                                        Generate Report
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-20 flex-col border border-blue-500/30">
                                        <BarChart3 className="w-6 h-6 mb-2" />
                                        Analytics Data
                                    </Button>
                                </div>
                                
                                <div className="p-4 bg-slate-700/40 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                                    <h4 className="font-semibold text-blue-300 mb-2">Current Data Info</h4>
                                    <div className="text-sm text-blue-300 space-y-1">
                                        <p>• <strong>Patents loaded:</strong> {patents.length}</p>
                                        <p>• <strong>Current page:</strong> {currentPage}</p>
                                        <p>• <strong>Start index:</strong> {currentPage * 100}</p>
                                        <p>• <strong>API endpoint:</strong> http://localhost:5000/api/patents/{currentPage * 100}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PatentAnalysis;