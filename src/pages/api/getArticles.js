// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebaseApp  from "../../firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import moment from "moment"
const db = getFirestore(firebaseApp);

export default async function getArticles(req, res) {
  //獲取初始資料
  const articlesRef = collection(db,"articles")
  const articlesSnapshot = await getDocs(articlesRef)
  const articlesList = articlesSnapshot.docs.map(doc => {
    let item = doc.data()
    item.date = moment(new Date(item.date.seconds*1000)).format("YYYY-MM-DD")
    return item
  });

  res.status(200).json(articlesList)
}