import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/resourceService';
import { Plus, Edit2, Trash2, X, Check, AlertCircle } from 'lucide-react';
import '../styles/global.css';

const ResourceManager = () => {
    const [resources, setResources] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [formData, setFormData] = useState({
        name: '', type: 'LECTURE_HALL', capacity: '', location: '', status: 'ACTIVE', availableFrom: '08:00', availableTo: '18:00'
    });
    const [toast, setToast] = useState(null);

    useEffect(() => {
        loadResources();
    }, []);

    const loadResources = async () => {
        const data = await resourceService.getAll();
        setResources(data);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingResource) {
                await resourceService.update(editingResource.id, formData);
                showToast('Resource updated successfully!', 'success');
            } else {
                await resourceService.create(formData);
                showToast('Resource created successfully!', 'success');
            }
            setIsModalOpen(false);
            setEditingResource(null);
            setFormData({ name: '', type: 'LECTURE_HALL', capacity: '', location: '', status: 'ACTIVE', availableFrom: '08:00', availableTo: '18:00' });
            loadResources();
        } catch (error) {
            showToast('Error saving resource.', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            await resourceService.delete(id);
            showToast('Resource deleted.', 'success');
            loadResources();
        }
    };

    const openEdit = (resource) => {
        setEditingResource(resource);
        setFormData(resource);
        setIsModalOpen(true);
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'left', margin: 0 }}>Manage Assets</h2>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Add Resource
                </button>
            </div>

            {toast && (
                <div className={`glass-card`} style={{ 
                    position: 'fixed', top: '100px', right: '40px', padding: '16px 24px', 
                    borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : 'var(--error)'}`,
                    zIndex: 1000, display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                    {toast.type === 'success' ? <Check color="var(--success)" /> : <AlertCircle color="var(--error)" />}
                    {toast.message}
                </div>
            )}

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <tr>
                            <th style={{ padding: '20px' }}>Name</th>
                            <th style={{ padding: '20px' }}>Type</th>
                            <th style={{ padding: '20px' }}>Capacity</th>
                            <th style={{ padding: '20px' }}>Location</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map(res => (
                            <tr key={res.id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '20px' }}>{res.name}</td>
                                <td style={{ padding: '20px' }}><span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{res.type}</span></td>
                                <td style={{ padding: '20px' }}>{res.capacity}</td>
                                <td style={{ padding: '20px' }}>{res.location}</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ 
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                                        background: res.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: res.status === 'ACTIVE' ? 'var(--success)' : 'var(--error)'
                                    }}>
                                        {res.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button onClick={() => openEdit(res)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(res.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div className="glass-card" style={{ width: '500px', padding: '40px', position: 'relative' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X /></button>
                        <h3 style={{ marginBottom: '32px' }}>{editingResource ? 'Edit Resource' : 'Add New Resource'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'grid', gap: '20px' }}>
                            <input type="text" placeholder="Resource Name" required className="glass-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <select className="glass-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option value="LECTURE_HALL">Lecture Hall</option>
                                    <option value="LAB">Lab</option>
                                    <option value="MEETING_ROOM">Meeting Room</option>
                                    <option value="EQUIPMENT">Equipment</option>
                                </select>
                                <input type="number" placeholder="Capacity" required className="glass-input" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
                            </div>
                            <input type="text" placeholder="Location (Building/Floor)" required className="glass-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                            <select className="glass-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="ACTIVE">Active</option>
                                <option value="OUT_OF_SERVICE">Out of Service</option>
                            </select>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From</label><input type="time" className="glass-input" value={formData.availableFrom} onChange={e => setFormData({...formData, availableFrom: e.target.value})} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>To</label><input type="time" className="glass-input" value={formData.availableTo} onChange={e => setFormData({...formData, availableTo: e.target.value})} /></div>
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '20px', justifyContent: 'center' }}>Save Resource</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceManager;
