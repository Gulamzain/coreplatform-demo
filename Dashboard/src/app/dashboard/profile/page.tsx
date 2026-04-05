// src/app/dashboard/profile/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BiUser, BiEnvelope, BiPhone, BiGlobe, BiSave, BiCamera, 
  BiCalendar, BiMapPin, BiBriefcase, BiHeart, BiEdit, 
  BiCheck, BiX, BiPlus, BiBuilding, BiFlag, BiLink
} from 'react-icons/bi';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Gulam zain',
    email: 'gulamzain@hotmail.com',
    phone: '(+91) 1254-56-4896',
    country: 'India',
    city: 'Hyderabad',
    birthday: '1998-08-20',
    bio: 'I have started my career as a trainee and prove my self and achieve all the milestone with good guidance and reach up to the project manager. In this journey, I understand all the procedure which make me a good developer, team leader, and a project manager.',
    skills: ['.NET', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
    languages: ['English', 'Arabic', 'Hindi'],
    website: 'www.gulamzain.com',
    position: 'Project Manager & Full Stack Developer',
    experience: '4+ years',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  const addLanguage = () => {
    if (newLanguage && !profile.languages.includes(newLanguage)) {
      setProfile({ ...profile, languages: [...profile.languages, newLanguage] });
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setProfile({ ...profile, languages: profile.languages.filter(l => l !== lang) });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>Profile Settings</h1>
          <p>Manage your personal information and preferences</p>
        </div>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <BiX size={18} /> : <BiEdit size={18} />}
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Banner Section */}
      <div className="banner-section">
        <div className="banner-image">
          <div className="banner-overlay"></div>
          {isEditing && (
            <button className="banner-edit">
              <BiCamera size={16} /> Change Cover
            </button>
          )}
        </div>
        <div className="avatar-section">
          <div className="avatar">
            <span>CM</span>
            {isEditing && (
              <button className="avatar-edit">
                <BiCamera size={14} />
              </button>
            )}
          </div>
          {isEditing ? (
            <input 
              type="text" 
              value={profile.fullName} 
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              className="edit-name-input"
            />
          ) : (
            <h2>{profile.fullName}</h2>
          )}
          {isEditing ? (
            <input 
              type="text" 
              value={profile.position} 
              onChange={(e) => setProfile({...profile, position: e.target.value})}
              className="edit-title-input"
            />
          ) : (
            <p className="title">{profile.position}</p>
          )}
        </div>
      </div>

      <div className="profile-container">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <div className="info-card">
            <h3>Personal Details</h3>
            <div className="info-item">
              <BiEnvelope />
              <div>
                <label>Email</label>
                {isEditing ? (
                  <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
            </div>
            <div className="info-item">
              <BiPhone />
              <div>
                <label>Phone</label>
                {isEditing ? (
                  <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
            </div>
            <div className="info-item">
              <BiMapPin />
              <div>
                <label>Location</label>
                {isEditing ? (
                  <div className="location-inputs">
                    <input type="text" value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} placeholder="City" />
                    <input type="text" value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} placeholder="Country" />
                  </div>
                ) : (
                  <p>{profile.city}, {profile.country}</p>
                )}
              </div>
            </div>
            <div className="info-item">
              <BiCalendar />
              <div>
                <label>Birthday</label>
                {isEditing ? (
                  <input type="date" value={profile.birthday} onChange={(e) => setProfile({...profile, birthday: e.target.value})} />
                ) : (
                  <p>{profile.birthday}</p>
                )}
              </div>
            </div>
            <div className="info-item">
              <BiBriefcase />
              <div>
                <label>Experience</label>
                {isEditing ? (
                  <input type="text" value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})} />
                ) : (
                  <p>{profile.experience}</p>
                )}
              </div>
            </div>
            <div className="info-item">
              <BiLink />
              <div>
                <label>Website</label>
                {isEditing ? (
                  <input type="url" value={profile.website} onChange={(e) => setProfile({...profile, website: e.target.value})} />
                ) : (
                  <p>{profile.website}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="stats-card">
            <h3>Account Stats</h3>
            <div className="stat-item">
              <span>Member Since</span>
              <strong>March 2024</strong>
            </div>
            <div className="stat-item">
              <span>Total Trades</span>
              <strong>127</strong>
            </div>
            <div className="stat-item">
              <span>Win Rate</span>
              <strong className="positive">68.5%</strong>
            </div>
            <div className="stat-item">
              <span>Verification</span>
              <strong className="verified">Verified</strong>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="profile-main">
          {/* About Me */}
          <div className="form-card">
            <h3>About Me</h3>
            {isEditing ? (
              <textarea 
                rows={5} 
                value={profile.bio} 
                onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                className="bio-input"
              />
            ) : (
              <p className="bio-text">{profile.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="form-card">
            <h3>Skills</h3>
            <div className="tags-list">
              {profile.skills.map((skill) => (
                <span key={skill} className="tag">
                  <span>{skill}</span>
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)}>
                      <BiX size={14} />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="add-tag">
                  <input 
                    type="text" 
                    placeholder="Add skill..." 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill}>
                    <BiPlus size={14} /> Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="form-card">
            <h3>Languages</h3>
            <div className="tags-list">
              {profile.languages.map((lang) => (
                <span key={lang} className="tag">
                  <span>{lang}</span>
                  {isEditing && (
                    <button onClick={() => removeLanguage(lang)}>
                      <BiX size={14} />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="add-tag">
                  <input 
                    type="text" 
                    placeholder="Add language..." 
                    value={newLanguage} 
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <button onClick={addLanguage}>
                    <BiPlus size={14} /> Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-card">
            <h3>Basic Information</h3>
            <div className="info-grid">
              <div className="info-row">
                <span>Full Name</span>
                {isEditing ? (
                  <input type="text" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} />
                ) : (
                  <strong>{profile.fullName}</strong>
                )}
              </div>
              <div className="info-row">
                <span>Email Address</span>
                {isEditing ? (
                  <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                ) : (
                  <strong>{profile.email}</strong>
                )}
              </div>
              <div className="info-row">
                <span>Phone Number</span>
                {isEditing ? (
                  <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                ) : (
                  <strong>{profile.phone}</strong>
                )}
              </div>
              <div className="info-row">
                <span>Country</span>
                {isEditing ? (
                  <input type="text" value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} />
                ) : (
                  <strong>{profile.country}</strong>
                )}
              </div>
              <div className="info-row">
                <span>City</span>
                {isEditing ? (
                  <input type="text" value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} />
                ) : (
                  <strong>{profile.city}</strong>
                )}
              </div>
              <div className="info-row">
                <span>Birthday</span>
                {isEditing ? (
                  <input type="date" value={profile.birthday} onChange={(e) => setProfile({...profile, birthday: e.target.value})} />
                ) : (
                  <strong>{profile.birthday}</strong>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <button className="save-btn" onClick={handleSave}>
              <BiSave size={18} /> Save Changes
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-page { max-width: 1400px; margin: 0 auto; }
        
        .page-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 32px; 
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin: 4px 0 0; }
        
        .edit-btn { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          padding: 10px 20px; 
          background: rgba(63,203,27,0.1); 
          border: 1px solid rgba(63,203,27,0.2); 
          border-radius: 10px; 
          color: #3fcb1b; 
          cursor: pointer; 
          transition: all 0.3s ease;
        }
        .edit-btn:hover { background: rgba(63,203,27,0.2); transform: translateY(-2px); }

        /* Banner Section */
        .banner-section { position: relative; margin-bottom: 80px; }
        .banner-image { height: 200px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); border-radius: 24px; position: relative; overflow: hidden; }
        .banner-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); }
        .banner-edit { position: absolute; bottom: 16px; right: 16px; padding: 8px 16px; background: rgba(0,0,0,0.6); border: none; border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 13px; transition: all 0.3s ease; }
        .banner-edit:hover { background: rgba(0,0,0,0.8); }

        .avatar-section { position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%); text-align: center; }
        .avatar { position: relative; width: 120px; height: 120px; margin: 0 auto; background: linear-gradient(135deg, #3fcb1b, #2e9c14); border-radius: 50%; border: 4px solid var(--bg-card); display: flex; align-items: center; justify-content: center; }
        .avatar span { font-size: 40px; font-weight: bold; color: white; }
        .avatar-edit { position: absolute; bottom: 4px; right: 4px; width: 32px; height: 32px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .avatar-edit:hover { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }
        
        .avatar-section h2 { font-size: 24px; font-weight: 600; color: var(--text-primary); margin: 12px 0 4px; }
        .avatar-section .title { color: var(--text-secondary); font-size: 14px; }
        .edit-name-input, .edit-title-input { text-align: center; margin-top: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); width: 100%; }

        /* Profile Container */
        .profile-container { display: grid; grid-template-columns: 320px 1fr; gap: 24px; margin-top: 40px; }
        @media (max-width: 1024px) { .profile-container { grid-template-columns: 1fr; } }

        /* Sidebar Cards */
        .info-card, .stats-card, .form-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; margin-bottom: 24px; transition: all 0.3s ease; }
        .info-card:hover, .stats-card:hover, .form-card:hover { border-color: rgba(63,203,27,0.3); }
        
        .info-card h3, .stats-card h3, .form-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        
        .info-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-color); }
        .info-item:last-child { border-bottom: none; }
        .info-item svg { color: #3fcb1b; flex-shrink: 0; margin-top: 2px; }
        .info-item label { font-size: 11px; color: var(--text-secondary); display: block; margin-bottom: 4px; }
        .info-item p { font-size: 14px; color: var(--text-primary); margin: 0; }
        .info-item input { width: 100%; padding: 8px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 13px; }
        .location-inputs { display: flex; gap: 8px; }
        .location-inputs input { flex: 1; }

        /* Stats Card */
        .stat-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-color); }
        .stat-item:last-child { border-bottom: none; }
        .stat-item span { font-size: 13px; color: var(--text-secondary); }
        .stat-item strong { font-size: 14px; color: var(--text-primary); font-weight: 600; }
        .stat-item .positive { color: #10b981; }
        .stat-item .verified { color: #3fcb1b; }

        /* Bio */
        .bio-input { width: 100%; padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; color: var(--text-primary); resize: vertical; font-family: inherit; }
        .bio-text { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0; }

        /* Tags */
        .tags-list { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(63,203,27,0.1); border-radius: 20px; color: #3fcb1b; font-size: 13px; }
        .tag button { background: none; border: none; color: #3fcb1b; cursor: pointer; display: flex; align-items: center; padding: 0; margin-left: 4px; }
        
        .add-tag { display: flex; gap: 8px; margin-top: 8px; }
        .add-tag input { flex: 1; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 20px; color: var(--text-primary); font-size: 13px; }
        .add-tag button { padding: 6px 12px; background: rgba(63,203,27,0.1); border: none; border-radius: 20px; color: #3fcb1b; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 12px; }

        /* Info Grid */
        .info-grid { display: flex; flex-direction: column; gap: 16px; }
        .info-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 12px; }
        .info-row span { font-size: 13px; color: var(--text-secondary); min-width: 120px; }
        .info-row strong { font-size: 14px; color: var(--text-primary); font-weight: 500; }
        .info-row input { flex: 1; padding: 8px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); }

        /* Save Button */
        .save-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 24px; }
        .save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(63,203,27,0.3); }
      `}</style>
    </div>
  );
}