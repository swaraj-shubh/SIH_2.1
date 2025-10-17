import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BarChart3, Download, Calendar, Users, Building, Shield, TrendingUp, Star, Flag, ChevronUp, ChevronLeft, ChevronDown, ChevronRight, FileText, Globe, User, Clock, Hash, AlertCircle } from 'lucide-react';

const PatentAnalysis = ({ theme = 'dark' }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [patents, setPatents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPatents, setTotalPatents] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatents, setFilteredPatents] = useState([]);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

    // Theme-specific styles
    const isLight = theme === 'light';
    
    const background = isLight 
        ? "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" 
        : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
    
    const textPrimary = isLight ? "text-slate-800" : "text-white";
    const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
    const textAccent = isLight ? "text-blue-600" : "text-blue-400";
    const textBlue = isLight ? "text-slate-600" : "text-blue-300";
    
    const cardBg = isLight ? "bg-white" : "bg-slate-800/30";
    const cardBorder = isLight ? "border-slate-200" : "border-blue-500/20";
    const cardHover = isLight ? "hover:border-blue-300 hover:shadow-md" : "hover:border-blue-400/40";
    
    const statsBg = isLight ? "bg-white" : "bg-slate-800/30";
    const statsBorder = isLight ? "border-slate-200" : "border-blue-500/20";
    
    const buttonPrimary = isLight 
        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md" 
        : "bg-blue-600 hover:bg-blue-700 text-white";
    
    const buttonSecondary = isLight 
        ? "border border-blue-500 text-blue-600 hover:bg-blue-50" 
        : "border border-blue-500 text-blue-400 hover:bg-blue-500/10";
    
    const inputStyle = isLight 
        ? "border-slate-300 bg-white text-slate-800 placeholder-slate-500 focus:border-blue-500" 
        : "border-blue-500/30 bg-slate-700/50 text-white placeholder-blue-300 focus:border-blue-400";
    
    const badgePrimary = isLight 
        ? "bg-blue-100 text-blue-700 border-blue-200" 
        : "bg-blue-500/20 text-blue-300 border-blue-400/30";
    
    const badgeSecondary = isLight 
        ? "bg-green-100 text-green-700 border-green-200" 
        : "bg-green-500/20 text-green-300 border-green-400/30";
    
    const badgeTertiary = isLight 
        ? "bg-purple-100 text-purple-700 border-purple-200" 
        : "bg-purple-500/20 text-purple-300 border-purple-400/30";
    
    const badgeStatus = (status) => {
        if (isLight) {
            return status === 'GRANTED' 
                ? 'bg-green-100 text-green-700 border-green-200'
                : status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                : 'bg-slate-100 text-slate-700 border-slate-200';
        } else {
            return status === 'GRANTED' 
                ? 'bg-green-500/20 text-green-300 border-green-400/30'
                : status === 'PENDING'
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                : 'bg-slate-700/50 text-blue-300 border-blue-400/30';
        }
    };

    const tabsBg = isLight ? "bg-slate-100" : "bg-slate-800/50";
    const tabsBorder = isLight ? "border-slate-300" : "border-blue-500/30";
    const tabsTrigger = isLight 
        ? "data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-600" 
        : "data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-300";

    const loadPatents = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const startIndex = page * 100;
            console.log(`Fetching patents from: ${API_BASE_URL}/patents/${startIndex}`);

            const response = await fetch(`${API_BASE_URL}/patents/${startIndex}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
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
            
            setPatents([]);
            setFilteredPatents([]);
            setTotalPatents(0);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        loadPatents(1);
    }, []);

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
            <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm ${cardHover} transition-all`}>
                <div 
                    className="p-4 cursor-pointer hover:bg-slate-700/40 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="outline" className={badgePrimary}>
                                    {patent.jurisdiction || 'N/A'}
                                </Badge>
                                <Badge variant="outline" className={badgeSecondary}>
                                    {patent.doc_number || 'N/A'}
                                </Badge>
                                {patent.kind && (
                                    <Badge variant="outline" className={badgeTertiary}>
                                        {patent.kind}
                                    </Badge>
                                )}
                                {patent.legal_status?.patent_status && (
                                    <Badge variant="outline" className={badgeStatus(patent.legal_status.patent_status)}>
                                        {patent.legal_status.patent_status}
                                    </Badge>
                                )}
                            </div>
                            
                            <h3 className={`text-lg font-semibold ${textPrimary} mb-2 line-clamp-2`}>
                                {title}
                            </h3>
                            
                            <div className={`flex items-center gap-4 text-sm ${textAccent}`}>
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
                        
                        <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline" className={badgePrimary}>
                                {isExpanded ? 'Hide Details' : 'Show Details'}
                            </Badge>
                            <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown className={`w-5 h-5 ${textAccent}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {isExpanded && (
                    <CardContent className={`pt-0 space-y-4 border-t ${isLight ? 'border-slate-200' : 'border-blue-500/30'}`}>
                        <div>
                            <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                <FileText className="w-4 h-4" />
                                Abstract
                            </Label>
                            <p className={`${textSecondary} text-sm leading-relaxed`}>
                                {abstract}
                            </p>
                        </div>

                        {applicants.length > 0 && (
                            <div>
                                <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                    <Building className="w-4 h-4" />
                                    Applicants ({applicants.length})
                                </Label>
                                <div className="space-y-2">
                                    {applicants.map((applicant, index) => (
                                        <div key={index} className={`${textSecondary} text-sm`}>
                                            <div className="font-medium">{applicant.extracted_name?.value || 'Unknown Applicant'}</div>
                                            {applicant.residence && (
                                                <div className={`text-xs ${textBlue}`}>Residence: {applicant.residence}</div>
                                            )}
                                            {applicant.extracted_address && (
                                                <div className={`text-xs ${textBlue}`}>{applicant.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {inventors.length > 0 && (
                            <div>
                                <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                    <User className="w-4 h-4" />
                                    Inventors ({inventors.length})
                                </Label>
                                <div className="space-y-2">
                                    {inventors.map((inventor, index) => (
                                        <div key={index} className={`${textSecondary} text-sm`}>
                                            <div className="font-medium">{inventor.extracted_name?.value || 'Unknown Inventor'}</div>
                                            {inventor.residence && (
                                                <div className={`text-xs ${textBlue}`}>Residence: {inventor.residence}</div>
                                            )}
                                            {inventor.extracted_address && (
                                                <div className={`text-xs ${textBlue}`}>{inventor.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {agents.length > 0 && (
                            <div>
                                <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                    <Users className="w-4 h-4" />
                                    Agents ({agents.length})
                                </Label>
                                <div className="space-y-2">
                                    {agents.map((agent, index) => (
                                        <div key={index} className={`${textSecondary} text-sm`}>
                                            <div className="font-medium">{agent.extracted_name?.value || 'Unknown Agent'}</div>
                                            {agent.extracted_address && (
                                                <div className={`text-xs ${textBlue}`}>{agent.extracted_address}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {classifications.length > 0 && (
                            <div>
                                <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                    <Hash className="w-4 h-4" />
                                    IPC Classifications ({classifications.length})
                                </Label>
                                <div className="flex flex-wrap gap-1">
                                    {classifications.map((classification, index) => (
                                        <Badge 
                                            key={index} 
                                            variant="secondary" 
                                            className={badgePrimary}
                                        >
                                            {classification.symbol || 'N/A'}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {patent.families && (
                            <div>
                                <Label className={`${textAccent} font-semibold flex items-center gap-2 mb-2`}>
                                    <Globe className="w-4 h-4" />
                                    Patent Family
                                </Label>
                                <div className={`${textSecondary} text-sm space-y-1`}>
                                    <div>Simple Family: {patent.families.simple_family?.size || 0} members</div>
                                    {patent.families.extended_family && (
                                        <div>Extended Family: {patent.families.extended_family.size} members</div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-blue-500/30'}`}>
                            <div className={`text-xs ${textBlue} space-y-1`}>
                                <div>Lens ID: {patent.lens_id || 'N/A'}</div>
                                <div>Document Key: {patent.doc_key || 'N/A'}</div>
                                {patent.lang && <div>Language: {patent.lang}</div>}
                            </div>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsExpanded(false)}
                                className={buttonSecondary}
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

    const StatCard = ({ title, value, icon, description }) => (
        <Card className={`${isLight ? 'bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-lg' : 'bg-gradient-to-br from-slate-800/60 to-blue-900/60 border-blue-500/30 shadow-lg'} backdrop-blur-sm`}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`${textAccent} text-sm font-medium`}>{title}</p>
                        <p className={`text-2xl font-bold ${textPrimary} mt-1`}>{value}</p>
                        {description && (
                            <p className={`${textBlue} text-xs mt-1`}>{description}</p>
                        )}
                    </div>
                    <div className={`p-3 ${isLight ? 'bg-blue-100 border-blue-200' : 'bg-blue-500/20 border-blue-500/30'} rounded-full border`}>
                        {React.cloneElement(icon, { className: `w-6 h-6 ${textAccent}` })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

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
        <div className={`min-h-screen ${background} ${textPrimary} p-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-bold ${textAccent} mb-3 transform -skew-x-6`}>
                        Patent Intelligence Dashboard
                    </h1>
                    <p className={`${textBlue} text-lg`}>
                        Advanced patent analysis and technology intelligence platform
                    </p>
                </div>

                {error && (
                    <Card className={`mb-6 ${isLight ? 'border-red-300 bg-red-50' : 'border-red-500/30 bg-red-500/20'} backdrop-blur-sm`}>
                        <CardContent className="p-4 flex items-center gap-3">
                            <AlertCircle className={`w-5 h-5 ${isLight ? 'text-red-500' : 'text-red-400'}`} />
                            <div className={`${isLight ? 'text-red-600' : 'text-red-300'} text-sm`}>
                                {error}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className={`mb-8 ${cardBorder} ${cardBg} backdrop-blur-sm shadow-lg`}>
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Search patents by title, applicant, inventor, jurisdiction, or document number..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className={`flex-1 ${inputStyle}`}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                            />
                            <Button 
                                onClick={() => handleSearch(searchTerm)}
                                className={buttonPrimary}
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                            <Button 
                                onClick={() => setSearchTerm('')}
                                variant="outline"
                                className={buttonSecondary}
                            >
                                Clear
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className={`grid w-full grid-cols-4 ${tabsBg} p-1 backdrop-blur-sm border ${tabsBorder}`}>
                        <TabsTrigger value="dashboard" className={tabsTrigger}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="patents" className={tabsTrigger}>
                            <FileText className="w-4 h-4 mr-2" />
                            Patents ({filteredPatents.length})
                        </TabsTrigger>
                        <TabsTrigger value="analysis" className={tabsTrigger}>
                            <Filter className="w-4 h-4 mr-2" />
                            Analysis
                        </TabsTrigger>
                        <TabsTrigger value="export" className={tabsTrigger}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <StatCard
                                title="Total Patents"
                                value={stats.total}
                                description="In database"
                                icon={<FileText />}
                            />
                            <StatCard
                                title="Jurisdictions"
                                value={stats.jurisdictions}
                                description="Countries/Regions"
                                icon={<Globe />}
                            />
                            <StatCard
                                title="Applicants"
                                value={stats.applicants}
                                description="Unique organizations"
                                icon={<Building />}
                            />
                            <StatCard
                                title="Inventors"
                                value={stats.inventors}
                                description="Unique inventors"
                                icon={<Users />}
                            />
                        </div>

                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                            <CardContent className="p-4">
                                <div className={`${textBlue} text-sm`}>
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
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                            <CardHeader>
                                <CardTitle className={`${textAccent} flex items-center justify-between`}>
                                    <span>Recent Patents Preview</span>
                                    <Badge variant="outline" className={badgePrimary}>
                                        Showing {stats.currentBatch} patents
                                    </Badge>
                                </CardTitle>
                                <CardDescription className={textBlue}>
                                    Loaded from API endpoint: /api/patents/{stats.startIndex}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {patents.length > 0 ? (
                                    <div className="grid gap-4">
                                        {patents.slice(0, 3).map((patent, index) => {
                                            const title = patent.biblio?.invention_title?.find(t => t.lang === 'en')?.text || 'No Title';
                                            return (
                                                <div key={index} className={`p-4 border ${cardBorder} rounded-lg ${isLight ? 'bg-slate-50' : 'bg-slate-700/40'} backdrop-blur-sm`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className={`font-semibold ${textPrimary} mb-1 line-clamp-2`}>
                                                                {title}
                                                            </h4>
                                                            <p className={`${textSecondary} text-sm line-clamp-2`}>
                                                                {patent.abstract?.find(a => a.lang === 'en')?.text?.substring(0, 150)}...
                                                            </p>
                                                            <div className={`flex items-center gap-4 mt-2 text-xs ${textBlue}`}>
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
                                    <div className={`text-center p-8 ${textAccent}`}>
                                        No patents loaded. Click "Refresh Data" to load patents.
                                    </div>
                                )}
                                <Button 
                                    onClick={() => setActiveTab('patents')}
                                    variant="outline" 
                                    className={`w-full mt-4 ${buttonSecondary}`}
                                >
                                    View All Patents
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="patents" className="space-y-6">
                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className={textBlue}>
                                        <div className="font-semibold">
                                            Showing {filteredPatents.length} patents 
                                            {searchTerm && ` (filtered from ${patents.length})`}
                                        </div>
                                        <div className={`${textBlue} text-sm`}>
                                            Page {currentPage} • Start Index: {currentPage * 100} • Total in DB: {totalPatents.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={prevPage}
                                            disabled={currentPage === 1 || loading}
                                            variant="outline"
                                            className={buttonSecondary}
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Previous
                                        </Button>
                                        <Button
                                            onClick={nextPage}
                                            disabled={loading}
                                            variant="outline"
                                            className={buttonSecondary}
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                        <Button
                                            onClick={() => loadPatents(currentPage)}
                                            disabled={loading}
                                            variant="outline"
                                            className={buttonSecondary}
                                        >
                                            {loading ? 'Loading...' : 'Refresh Data'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {loading ? (
                            <Card className={`text-center p-8 ${cardBorder} ${cardBg} backdrop-blur-sm`}>
                                <CardContent>
                                    <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isLight ? 'border-blue-500' : 'border-blue-400'} mx-auto mb-4`}></div>
                                    <h3 className={`text-lg font-semibold ${textAccent} mb-2`}>
                                        Loading Patents...
                                    </h3>
                                </CardContent>
                            </Card>
                        ) : filteredPatents.length > 0 ? (
                            <div className="space-y-4">
                                {filteredPatents.map((patent, index) => (
                                    <PatentDropdownCard key={`${patent.lens_id}-${index}`} patent={patent} />
                                ))}
                            </div>
                        ) : (
                            <Card className={`text-center p-8 ${cardBorder} ${cardBg} backdrop-blur-sm`}>
                                <CardContent>
                                    <Search className={`w-12 h-12 ${textAccent} mx-auto mb-4`} />
                                    <h3 className={`text-lg font-semibold ${textAccent} mb-2`}>
                                        {searchTerm ? 'No matching patents found' : 'No patents available'}
                                    </h3>
                                    <p className={textBlue}>
                                        {searchTerm 
                                            ? 'Try adjusting your search terms'
                                            : 'Click "Refresh Data" to load patents from the API'
                                        }
                                    </p>
                                    {!searchTerm && (
                                        <Button 
                                            onClick={() => loadPatents(currentPage)}
                                            className={`mt-4 ${buttonPrimary}`}
                                        >
                                            Load Patents
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="analysis">
                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                            <CardHeader>
                                <CardTitle className={textAccent}>Patent Analysis</CardTitle>
                                <CardDescription className={textBlue}>
                                    Analytics and insights from the current patent batch
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {patents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                                            <CardHeader>
                                                <CardTitle className={`${textAccent} text-lg`}>Jurisdiction Distribution</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {Array.from(new Set(patents.map(p => p.jurisdiction).filter(Boolean))).map(jurisdiction => (
                                                        <div key={jurisdiction} className="flex justify-between items-center">
                                                            <span className={textSecondary}>{jurisdiction}</span>
                                                            <Badge variant="secondary" className={badgePrimary}>
                                                                {patents.filter(p => p.jurisdiction === jurisdiction).length}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                                            <CardHeader>
                                                <CardTitle className={`${textAccent} text-lg`}>Top Applicants</CardTitle>
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
                                                                    <span className={`${textSecondary} text-sm truncate`} title={applicant}>
                                                                        {applicant}
                                                                    </span>
                                                                    <Badge variant="secondary" className={badgePrimary}>
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
                                    <div className={`text-center p-8 ${textAccent}`}>
                                        Load patents first to see analysis
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="export">
                        <Card className={`${cardBorder} ${cardBg} backdrop-blur-sm`}>
                            <CardHeader>
                                <CardTitle className={textAccent}>Export & Download</CardTitle>
                                <CardDescription className={textBlue}>
                                    Export patent data for further analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button className={`${buttonPrimary} h-20 flex-col border ${isLight ? 'border-blue-400' : 'border-blue-500/30'}`}>
                                        <Download className="w-6 h-6 mb-2" />
                                        Export to CSV
                                    </Button>
                                    <Button className={`${buttonPrimary} h-20 flex-col border ${isLight ? 'border-blue-400' : 'border-blue-500/30'}`}>
                                        <FileText className="w-6 h-6 mb-2" />
                                        Generate Report
                                    </Button>
                                    <Button className={`${buttonPrimary} h-20 flex-col border ${isLight ? 'border-blue-400' : 'border-blue-500/30'}`}>
                                        <BarChart3 className="w-6 h-6 mb-2" />
                                        Analytics Data
                                    </Button>
                                </div>
                                
                                <div className={`p-4 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-700/40 border-blue-500/30'} rounded-lg border backdrop-blur-sm`}>
                                    <h4 className={`font-semibold ${textAccent} mb-2`}>Current Data Info</h4>
                                    <div className={`text-sm ${textBlue} space-y-1`}>
                                        <p>• <strong>Patents loaded:</strong> {patents.length}</p>
                                        <p>• <strong>Current page:</strong> {currentPage}</p>
                                        <p>• <strong>Start index:</strong> {currentPage * 100}</p>
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