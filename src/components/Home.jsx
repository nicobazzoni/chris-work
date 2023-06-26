import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import '../index.css';
import UploadForm from './Form';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const currentUser = getAuth().currentUser;

  const fetchProjects = async () => {
    const db = getFirestore();
    const projectsCollection = collection(db, 'users', currentUser.uid, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(projectsList);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFieldChange = async (project, field, value) => {
    const user = getAuth().currentUser;
    const db = getFirestore();
    const projectRef = doc(db, 'users', user.uid, 'projects', project.id);
    await updateDoc(projectRef, { [field]: value });
    fetchProjects();
  };

  const deleteProject = async (project) => {
    const user = getAuth().currentUser;
    const db = getFirestore();
    const projectRef = doc(db, 'users', user.uid, 'projects', project.id);
    await deleteDoc(projectRef);
    toast('Project deleted', { type: 'success' });
    fetchProjects();
  };

  return (
    <div className='flex-col items-center m-2 '> 
      <h1 className='text-mono font-light mb-4'>welcome <span className='bg-yellow-200 p-2 shadow-md opacity-2 shadow-black font-bold'>{currentUser.email.split('@')[0]}!</span></h1>
      <h2 className='text-bold bg-whitesmoke border-2 border-md p-1 text-center'>Create Project</h2>
      <div className='mt-5 border-t-2 space-y-4 '>
        <UploadForm onFormSubmit={fetchProjects} />
      </div>
<h1 className='text-mono bg-whitemsoke border mt-5  p-2 rounded-md'>Projects</h1>
      {projects.map((project, index) => (
        <div key={index} className="p-4 border-4 rounded-md m-2  space-y-3">
          <h2 className="text-xs font-semibold">title</h2>
          <input
            className="w-full border p-2"
            value={project.title}
            onChange={e => handleFieldChange(project, 'title', e.target.value)}
          />

          <h2 className="text-xs font-semibold">initial Budget</h2>
          <input
            type="number"
            className="w-full border p-2"
            value={project.initBudget}
            onChange={e => handleFieldChange(project, 'initBudget', Number(e.target.value))}
          />

          <h2 className="text-xs font-semibold">notes</h2>
          <textarea
            className="w-full border p-2"
            value={project.toDo}
            onChange={e => handleFieldChange(project, 'toDo', e.target.value)}
          />

          <h2 className="text-xs font-semibold">costs</h2>
          <input
            type="number"
            className="w-full border p-2"
            value={project.cost}
            onChange={e => handleFieldChange(project, 'cost', Number(e.target.value))}
          />

          <p>Remaining Budget: {project.initBudget - project.cost}</p>

          <button className='border rounded-md m-2 bg-red-700 p-1' onClick={() => deleteProject(project)}>Delete Project</button> 
        </div>
      ))}

      
    </div>
  )
}

export default Home;
