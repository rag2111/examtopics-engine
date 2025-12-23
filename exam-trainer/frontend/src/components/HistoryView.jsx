import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const HistoryView = () => {
    // Initialize with empty array
    const [history, setHistory] = useState([]);

    useEffect(() => {
        console.log("HistoryView: useEffect mounting");
        const stored = localStorage.getItem('exam_history');
        console.log("HistoryView: stored value", stored);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log("HistoryView: parsed value", parsed);
                // Sort by date desc
                parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
                setHistory(parsed);
                console.log("HistoryView: history set");
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        } else {
            console.log("HistoryView: No stored history");
        }
    }, []);

    const clearHistory = () => {
        console.log("HistoryView: Clearing history");
        localStorage.removeItem('exam_history');
        setHistory([]);
    };

    console.log("HistoryView: Rendering, history length:", history.length);

    try {
        return (
            <div className="history-view glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h1>Exam History</h1>
                    </div>
                    {history.length > 0 && (
                        <button
                            className="secondary"
                            onClick={clearHistory}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', borderColor: 'rgba(231, 76, 60, 0.3)' }}
                        >
                            <Trash2 size={16} /> Clear History
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <p>No exams taken yet.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '0.8rem', color: 'var(--text-muted)' }}>Date</th>
                                    <th style={{ textAlign: 'left', padding: '0.8rem', color: 'var(--text-muted)' }}>Exam</th>
                                    <th style={{ textAlign: 'left', padding: '0.8rem', color: 'var(--text-muted)' }}>Score</th>
                                    <th style={{ textAlign: 'left', padding: '0.8rem', color: 'var(--text-muted)' }}>Time</th>
                                    <th style={{ textAlign: 'left', padding: '0.8rem', color: 'var(--text-muted)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>
                                            {new Date(entry.date).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '0.8rem' }}>{entry.filename ? entry.filename.replace('.json', '') : 'Unknown'}</td>
                                        <td style={{ padding: '0.8rem' }}>
                                            {entry.score} / {entry.total} ({entry.percent}%)
                                        </td>
                                        <td style={{ padding: '0.8rem', fontFamily: 'monospace' }}>
                                            {entry.timeElapsed}
                                        </td>
                                        <td style={{ padding: '0.8rem' }}>
                                            <span style={{
                                                color: entry.passed ? 'var(--success)' : 'var(--danger)',
                                                fontWeight: 'bold'
                                            }}>
                                                {entry.passed ? 'PASSED' : 'FAILED'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    } catch (renderError) {
        console.error("HistoryView: Render Error", renderError);
        return <div>Error rendering history</div>;
    }
};

export default HistoryView;
