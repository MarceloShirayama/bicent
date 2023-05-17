import {
  DocumentData,
  DocumentSnapshot,
  OrderByDirection,
  QueryConstraint,
  WhereFilterOp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../config/app";
import { Id } from "@/logic/core/common/id";

/*
type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
*/

export type Filter = {
  attribute: string;
  op: WhereFilterOp;
  value: any;
};

export class Collection {
  async save(path: string, entity: any, id?: string) {
    const db = getFirestore(app);
    const idFinal = id ?? entity.id ?? Id.new();
    const docRef = doc(db, path, idFinal);

    await setDoc(docRef, entity);

    return {
      ...entity,
      id: entity.id ?? idFinal,
    };
  }

  async remove(path: string, id?: string) {
    if (!id) return false;

    const db = getFirestore(app);
    const docRef = doc(db, path, id);
    const dbItem = await getDoc(docRef);

    if (!dbItem.exists()) return false;

    await deleteDoc(docRef);

    return true;
  }

  async findAll(
    path: string,
    orderQueryBy?: string,
    direction?: OrderByDirection
  ) {
    const db = getFirestore(app);
    const collectionRef = collection(db, path);
    const filter: QueryConstraint[] = [];
    const order = orderQueryBy ? [orderBy(orderQueryBy, direction)] : [];
    const queryResult = query(collectionRef, ...filter, ...order);
    const result = await getDocs(queryResult);

    return result.docs.map(this.convertFromFirebase) ?? [];
  }

  async findById(path: string, id: string) {
    if (!id) return null;

    const db = getFirestore(app);
    const docRef = doc(db, path, id);
    const result = await getDoc(docRef);

    return this.convertFromFirebase(result);
  }

  async findAllWithFilter(
    path: string,
    filters: Filter[],
    orderQueryBy?: string,
    direction?: OrderByDirection
  ) {
    const db = getFirestore(app);
    const collectionRef = collection(db, path);

    const filtersWhere =
      filters?.map((filter) =>
        where(filter.attribute, filter.op, filter.value)
      ) ?? [];
    const order = orderQueryBy ? [orderBy(orderQueryBy, direction)] : [];

    const queryResult = query(collectionRef, ...filtersWhere, ...order);
    const result = await getDocs(queryResult);

    return result.docs.map(this.convertFromFirebase) ?? [];
  }

  private convertFromFirebase(snapshot: DocumentSnapshot<DocumentData>) {
    if (!snapshot.exists()) return null;

    const entity: any = { ...snapshot.data(), id: snapshot.id };

    if (!entity) return entity;

    return Object.keys(entity).reduce((obj: any, attribute: string) => {
      const value = entity[attribute];

      return { ...obj, [attribute]: value.toDate?.() ?? value };
    }, {});
  }
}
