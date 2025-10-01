import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // User Profile
    profile: {
      name: 'DRDO Analyst',
      email: 'analyst@drdo.gov.in',
      department: 'Technology Forecasting',
      role: 'Senior Analyst',
      notifications: {
        email: true,
        push: true,
        weeklyReports: true,
        criticalAlerts: true
      }
    },
    
    // Data Sources
    dataSources: {
      patents: {
        enabled: true,
        autoUpdate: true,
        sources: ['USPTO', 'EPO', 'WIPO', 'Indian Patents']
      },
      publications: {
        enabled: true,
        autoUpdate: true,
        sources: ['IEEE', 'Springer', 'Elsevier', 'arXiv', 'PubMed']
      },
      marketData: {
        enabled: true,
        autoUpdate: false,
        sources: ['MarketResearch.com', 'Statista', 'Gartner']
      },
      companies: {
        enabled: true,
        autoUpdate: true,
        sources: ['Crunchbase', 'PitchBook', 'Company Filings']
      }
    },
    
    // Analytics Preferences
    analytics: {
      defaultTimeRange: '2y',
      chartTheme: 'light',
      autoRefresh: true,
      refreshInterval: 30, // minutes
      exportFormat: 'pdf',
      dataPoints: {
        showTrendLines: true,
        showConfidenceIntervals: true,
        showAnomalies: true
      }
    },
    
    // API & Integration
    integrations: {
      llmProvider: 'openai',
      apiKeys: {
        openai: '',
        anthropic: '',
        google: ''
      },
      webhooks: {
        enabled: false,
        url: ''
      },
      dataExport: {
        autoBackup: true,
        backupFrequency: 'weekly',
        formats: ['json', 'csv', 'excel']
      }
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (category, subKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subKey]: {
          ...prev[category][subKey],
          [key]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    // In real app, this would call an API to save settings
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default settings
      setSettings({
        profile: {
          name: 'DRDO Analyst',
          email: 'analyst@drdo.gov.in',
          department: 'Technology Forecasting',
          role: 'Senior Analyst',
          notifications: {
            email: true,
            push: true,
            weeklyReports: true,
            criticalAlerts: true
          }
        },
        dataSources: {
          patents: { enabled: true, autoUpdate: true, sources: ['USPTO', 'EPO', 'WIPO', 'Indian Patents'] },
          publications: { enabled: true, autoUpdate: true, sources: ['IEEE', 'Springer', 'Elsevier', 'arXiv', 'PubMed'] },
          marketData: { enabled: true, autoUpdate: false, sources: ['MarketResearch.com', 'Statista', 'Gartner'] },
          companies: { enabled: true, autoUpdate: true, sources: ['Crunchbase', 'PitchBook', 'Company Filings'] }
        },
        analytics: {
          defaultTimeRange: '2y',
          chartTheme: 'light',
          autoRefresh: true,
          refreshInterval: 30,
          exportFormat: 'pdf',
          dataPoints: { showTrendLines: true, showConfidenceIntervals: true, showAnomalies: true }
        },
        integrations: {
          llmProvider: 'openai',
          apiKeys: { openai: '', anthropic: '', google: '' },
          webhooks: { enabled: false, url: '' },
          dataExport: { autoBackup: true, backupFrequency: 'weekly', formats: ['json', 'csv', 'excel'] }
        }
      });
    }
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: '👤' },
    { id: 'data-sources', label: 'Data Sources', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings & Configuration</h1>
        <p>Manage your platform preferences and system configuration</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="settings-actions">
            <button className="btn-primary" onClick={saveSettings}>
              Save Changes
            </button>
            <button className="btn-secondary" onClick={resetSettings}>
              Reset to Default
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>User Profile</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={settings.profile.department}
                    onChange={(e) => handleSettingChange('profile', 'department', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={settings.profile.role}
                    onChange={(e) => handleSettingChange('profile', 'role', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-section">
                  <h3>Notification Preferences</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.profile.notifications.email}
                        onChange={(e) => handleNestedSettingChange('profile', 'notifications', 'email', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Email Notifications
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.profile.notifications.push}
                        onChange={(e) => handleNestedSettingChange('profile', 'notifications', 'push', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Push Notifications
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.profile.notifications.weeklyReports}
                        onChange={(e) => handleNestedSettingChange('profile', 'notifications', 'weeklyReports', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Weekly Reports
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.profile.notifications.criticalAlerts}
                        onChange={(e) => handleNestedSettingChange('profile', 'notifications', 'criticalAlerts', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Critical Alerts
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Sources Settings */}
          {activeTab === 'data-sources' && (
            <div className="settings-section">
              <h2>Data Sources Configuration</h2>
              <p className="section-description">
                Configure and manage data sources for technology intelligence gathering
              </p>

              <div className="data-sources-grid">
                {Object.entries(settings.dataSources).map(([source, config]) => (
                  <div key={source} className="data-source-card">
                    <div className="source-header">
                      <h3>{source.charAt(0).toUpperCase() + source.slice(1)} Data</h3>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={(e) => handleNestedSettingChange('dataSources', source, 'enabled', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    <div className="source-config">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={config.autoUpdate}
                          onChange={(e) => handleNestedSettingChange('dataSources', source, 'autoUpdate', e.target.checked)}
                          disabled={!config.enabled}
                        />
                        <span className="checkmark"></span>
                        Auto-update data
                      </label>
                    </div>

                    <div className="source-sources">
                      <h4>Connected Sources:</h4>
                      <div className="sources-list">
                        {config.sources.map((src, index) => (
                          <span key={index} className="source-tag">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="btn-secondary"
                      disabled={!config.enabled}
                    >
                      Configure Sources
                    </button>
                  </div>
                ))}
              </div>

              <div className="data-refresh-section">
                <h3>Data Refresh Schedule</h3>
                <div className="refresh-options">
                  <label className="radio-label">
                    <input type="radio" name="refresh" value="daily" defaultChecked />
                    <span className="radiomark"></span>
                    Daily Refresh
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="refresh" value="weekly" />
                    <span className="radiomark"></span>
                    Weekly Refresh
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="refresh" value="monthly" />
                    <span className="radiomark"></span>
                    Monthly Refresh
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Settings */}
          {activeTab === 'analytics' && (
            <div className="settings-section">
              <h2>Analytics & Visualization Preferences</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>Default Time Range</label>
                  <select
                    value={settings.analytics.defaultTimeRange}
                    onChange={(e) => handleSettingChange('analytics', 'defaultTimeRange', e.target.value)}
                    className="form-select"
                  >
                    <option value="1y">Last Year</option>
                    <option value="2y">Last 2 Years</option>
                    <option value="5y">Last 5 Years</option>
                    <option value="10y">Last 10 Years</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Chart Theme</label>
                  <select
                    value={settings.analytics.chartTheme}
                    onChange={(e) => handleSettingChange('analytics', 'chartTheme', e.target.value)}
                    className="form-select"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Auto-refresh Interval (minutes)</label>
                  <input
                    type="number"
                    value={settings.analytics.refreshInterval}
                    onChange={(e) => handleSettingChange('analytics', 'refreshInterval', parseInt(e.target.value))}
                    className="form-input"
                    min="1"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label>Default Export Format</label>
                  <select
                    value={settings.analytics.exportFormat}
                    onChange={(e) => handleSettingChange('analytics', 'exportFormat', e.target.value)}
                    className="form-select"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="png">PNG Image</option>
                  </select>
                </div>

                <div className="form-section">
                  <h3>Chart Display Options</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.analytics.dataPoints.showTrendLines}
                        onChange={(e) => handleNestedSettingChange('analytics', 'dataPoints', 'showTrendLines', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Show Trend Lines
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.analytics.dataPoints.showConfidenceIntervals}
                        onChange={(e) => handleNestedSettingChange('analytics', 'dataPoints', 'showConfidenceIntervals', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Show Confidence Intervals
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.analytics.dataPoints.showAnomalies}
                        onChange={(e) => handleNestedSettingChange('analytics', 'dataPoints', 'showAnomalies', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Highlight Anomalies
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div className="settings-section">
              <h2>API & Integrations</h2>
              
              <div className="integration-section">
                <h3>AI/LLM Providers</h3>
                <div className="provider-options">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="llmProvider" 
                      value="openai" 
                      checked={settings.integrations.llmProvider === 'openai'}
                      onChange={(e) => handleSettingChange('integrations', 'llmProvider', e.target.value)}
                    />
                    <span className="radiomark"></span>
                    OpenAI GPT
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="llmProvider" 
                      value="anthropic" 
                      checked={settings.integrations.llmProvider === 'anthropic'}
                      onChange={(e) => handleSettingChange('integrations', 'llmProvider', e.target.value)}
                    />
                    <span className="radiomark"></span>
                    Anthropic Claude
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="llmProvider" 
                      value="google" 
                      checked={settings.integrations.llmProvider === 'google'}
                      onChange={(e) => handleSettingChange('integrations', 'llmProvider', e.target.value)}
                    />
                    <span className="radiomark"></span>
                    Google PaLM
                  </label>
                </div>

                <div className="api-keys">
                  <h4>API Keys</h4>
                  {Object.entries(settings.integrations.apiKeys).map(([provider, key]) => (
                    <div key={provider} className="form-group">
                      <label>{provider.charAt(0).toUpperCase() + provider.slice(1)} API Key</label>
                      <input
                        type="password"
                        value={key}
                        onChange={(e) => handleNestedSettingChange('integrations', 'apiKeys', provider, e.target.value)}
                        className="form-input"
                        placeholder={`Enter ${provider} API key`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="integration-section">
                <h3>Webhook Integration</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.integrations.webhooks.enabled}
                      onChange={(e) => handleNestedSettingChange('integrations', 'webhooks', 'enabled', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Enable Webhook Notifications
                  </label>
                </div>
                
                {settings.integrations.webhooks.enabled && (
                  <div className="form-group">
                    <label>Webhook URL</label>
                    <input
                      type="url"
                      value={settings.integrations.webhooks.url}
                      onChange={(e) => handleNestedSettingChange('integrations', 'webhooks', 'url', e.target.value)}
                      className="form-input"
                      placeholder="https://your-webhook-url.com"
                    />
                  </div>
                )}
              </div>

              <div className="integration-section">
                <h3>Data Export & Backup</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.integrations.dataExport.autoBackup}
                      onChange={(e) => handleNestedSettingChange('integrations', 'dataExport', 'autoBackup', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Automatic Data Backup
                  </label>
                </div>

                <div className="form-group">
                  <label>Backup Frequency</label>
                  <select
                    value={settings.integrations.dataExport.backupFrequency}
                    onChange={(e) => handleNestedSettingChange('integrations', 'dataExport', 'backupFrequency', e.target.value)}
                    className="form-select"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Export Formats</label>
                  <div className="checkbox-group">
                    {settings.integrations.dataExport.formats.map(format => (
                      <label key={format} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={true}
                          readOnly
                        />
                        <span className="checkmark"></span>
                        {format.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security & Privacy</h2>
              
              <div className="security-section">
                <h3>Password Management</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" className="form-input" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" className="form-input" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" className="form-input" placeholder="Confirm new password" />
                </div>
                <button className="btn-primary">Update Password</button>
              </div>

              <div className="security-section">
                <h3>Two-Factor Authentication</h3>
                <div className="security-status">
                  <span className="status-badge disabled">Disabled</span>
                  <p>Add an extra layer of security to your account</p>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>
              </div>

              <div className="security-section">
                <h3>Session Management</h3>
                <div className="sessions-list">
                  <div className="session-item">
                    <div className="session-info">
                      <strong>Current Session</strong>
                      <span>Chrome on Windows • Active now</span>
                    </div>
                    <button className="btn-secondary btn-small">Logout</button>
                  </div>
                  <div className="session-item">
                    <div className="session-info">
                      <strong>Previous Session</strong>
                      <span>Firefox on macOS • 2 hours ago</span>
                    </div>
                    <button className="btn-secondary btn-small">Revoke</button>
                  </div>
                </div>
                <button className="btn-secondary">Logout from all devices</button>
              </div>

              <div className="security-section">
                <h3>Data Privacy</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Allow usage analytics (anonymous)
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Share insights with DRDO research community
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Allow email communications
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;