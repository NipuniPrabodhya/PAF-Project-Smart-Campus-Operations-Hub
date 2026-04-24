import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/resourceService';
import { Search, MapPin, Users, Clock, Filter } from 'lucide-react';
import '../styles/global.css';

const AssetCatalogue = () => {
    const [resources, setResources] = useState([]);
    const [filters, setFilters] = useState({ type: '', location: '', capacity: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResources();
    }, [filters]);

    const loadResources = async () => {
        try {
            setLoading(true);
            const data = await resourceService.getAll(filters);
            setResources(data);
        } catch (error) {
            console.error("Error loading resources:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'left', marginBottom: '40px' }}>
                Campus Assets & Facilities
            </h2>

            <div className="glass-card" style={{ padding: '24px', marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '20px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by location..." 
                        className="glass-input"
                        style={{ paddingLeft: '40px' }}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                </div>
                
                <select className="glass-input" onChange={(e) => setFilters({...filters, type: e.target.value})}>
                    <option value="">All Types</option>
                    <option value="LECTURE_HALL">Lecture Hall</option>
                    <option value="LAB">Laboratory</option>
                    <option value="MEETING_ROOM">Meeting Room</option>
                    <option value="EQUIPMENT">Equipment</option>
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={18} color="var(--text-muted)" />
                    <input 
                        type="number" 
                        placeholder="Min Capacity" 
                        className="glass-input"
                        style={{ width: '140px' }}
                        onChange={(e) => setFilters({...filters, capacity: e.target.value})}
                    />
                </div>

                <button className="btn-primary" onClick={loadResources}><Filter size={18} /> Filter</button>
            </div>

            {loading ? (
                <p>Loading assets...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                    {resources.map(resource => (
                        <div key={resource.id} className="glass-card" style={{ padding: '24px', transition: 'transform 0.2s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                                    {resource.type}
                                </span>
                                <span style={{ 
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                                    background: resource.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: resource.status === 'ACTIVE' ? 'var(--success)' : 'var(--error)'
                                }}>
                                    ● {resource.status}
                                </span>
                            </div>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>{resource.name}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} /> {resource.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Users size={16} /> {resource.capacity} Pax
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
                                    <Clock size={16} /> Available: {resource.availableFrom} - {resource.availableTo}
                                </div>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }} disabled={resource.status !== 'ACTIVE'}>
                                {resource.status === 'ACTIVE' ? 'Request Booking' : 'Not Available'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssetCatalogue;
