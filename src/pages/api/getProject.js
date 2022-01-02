// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebaseApp  from "../../firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebaseApp);

export default async function getProject(req, res) {
  //獲取初始資料
  const projectRef = collection(db,"projects")
  const projectSnapshot = await getDocs(projectRef)
  const projectList = projectSnapshot.docs.map(doc => doc.data());

  res.status(200).json(projectList)
}