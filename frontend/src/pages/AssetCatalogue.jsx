import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/resourceService';
import { Search, Filter, MapPin, Users, Tag } from 'lucide-react';
import '../styles/global.css';

const AssetCatalogue = () => {
    const [resources, setResources] = useState([]);
    const [filters, setFilters] = useState({ type: '', location: '', minCapacity: '' });
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

            <div className="glass-card" style={{ padding: '24px', marginBottom: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by location..." 
                        style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                </div>
                <select 
                    style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                    <option value="">All Types</option>
                    <option value="LECTURE_HALL">Lecture Hall</option>
                    <option value="LAB">Laboratory</option>
                    <option value="MEETING_ROOM">Meeting Room</option>
                    <option value="EQUIPMENT">Equipment</option>
                </select>
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
                                <span style={{ color: resource.status === 'ACTIVE' ? 'var(--success)' : 'var(--error)', fontSize: '0.8rem' }}>
                                    ● {resource.status}
                                </span>
                            </div>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>{resource.name}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} /> {resource.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Users size={16} /> {resource.capacity} Pax
                                </div>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssetCatalogue;
