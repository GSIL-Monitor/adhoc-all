package org.apache.solr.request.uninverted;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.lucene.index.DocValuesReader;
import org.apache.solr.request.BlockBufferPool.BlockArray;
import org.apache.solr.request.uninverted.TermIndex.IndexSearch;
import org.apache.solr.request.uninverted.UnInvertedFieldUtils.FieldDatatype;
import org.apache.solr.search.BitDocSet;
import org.apache.solr.search.DocIterator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RamDocValueFill {
	public static Logger log = LoggerFactory.getLogger(RamDocValueFill.class);

	public static int Fill(UnInvertedField inv, int maxdoc, boolean isinit,
			TermIndex ti, DocValuesReader quicktisInput, int fieldNumber,
			boolean isReadDouble, BitDocSet baseAdvanceDocs)
			throws IOException, CloneNotSupportedException {
		long l0=System.currentTimeMillis();

		boolean isreadText=isinit&&(!isReadDouble);
		DocValuesReader docValues = (DocValuesReader) quicktisInput.clone();
			docValues.seekTo(fieldNumber,isreadText );
			int doc = -1;
			int tm = 0;
			long l1=System.currentTimeMillis();

			if (inv.fieldDataType == FieldDatatype.d_double) {
				if (baseAdvanceDocs != null) {
					DocIterator iter = baseAdvanceDocs.iterator();
					while (iter.hasNext()) {
						doc = iter.nextDoc();
						tm = docValues.readTm(doc);
						inv.markDocTm(doc, tm, isinit);
						inv.bits.add(doc);
						if (isReadDouble) {
							inv.setTmValueDouble(tm,RamTermNumValue.EMPTY_FOR_MARK);
						}
					}
				} else {
					for (doc = 0; doc < maxdoc; doc++) {
						tm = docValues.readTm(doc);
						inv.markDocTm(doc, tm, isinit);
						inv.bits.add(doc);
						if (isReadDouble) {
							inv.setTmValueDouble(tm,RamTermNumValue.EMPTY_FOR_MARK);
						}
					}
				}
			} else {
				if (baseAdvanceDocs != null) {
					DocIterator iter = baseAdvanceDocs.iterator();
					while (iter.hasNext()) {
						doc = iter.nextDoc();
						tm = docValues.readTm(doc);
						inv.markDocTm(doc, tm, isinit);
						inv.bits.add(doc);
						if (isReadDouble) {
							inv.setTmValueLong(tm,	(long) RamTermNumValue.EMPTY_FOR_MARK);
						}
					}
				} else {
					for (doc = 0; doc < maxdoc; doc++) {
						tm = docValues.readTm(doc);
						inv.markDocTm(doc, tm, isinit);
						inv.bits.add(doc);
						if (isReadDouble) {
							inv.setTmValueLong(tm,	(long) RamTermNumValue.EMPTY_FOR_MARK);
						}
					}
				}
			}
			
			long l2=System.currentTimeMillis();

	
			if (isReadDouble) {
				if (inv.fieldDataType == FieldDatatype.d_double) {
					BlockArray<Double> list = inv.getTmValueDouble();
					for (int i = 0; i <=docValues.maxtm; i++) {
						if (list.get(i) <= RamTermNumValue.EMPTY_FOR_MARK_FORCMP) {
							double val = Double.longBitsToDouble(docValues.readTmValue(i,true));
							list.set(i, val);
						}
					}
				} else {
					BlockArray<Long> list = inv.getTmValueLong();
					for (int i = 0; i <=docValues.maxtm; i++) {
						if (list.get(i) <= RamTermNumValue.EMPTY_FOR_MARK_FORCMP) {
							long val = docValues.readTmValue(i,false);
							list.set(i, val);
						}
					}
				}
	
			}
			
			long l3=System.currentTimeMillis();

			if (isreadText) {
				ArrayList<String> lst = docValues.lst;
				ti.nTerms = docValues.maxtm;
				ti.sizeOfStrings = docValues.sizeOfStrings;
				ti.index = new IndexSearch();
				ti.index.index = lst != null ? lst.toArray(new String[lst.size()]) : new String[0];
			}else if(isinit){
				ti.nTerms = docValues.maxtm;
				ti.sizeOfStrings = 0;
				ti.index = new IndexSearch();
				ti.index.index =  new String[0];
			}
			long l4=System.currentTimeMillis();


			log.info("file timetaken:"+(l4-l3)+","+(l3-l2)+","+(l2-l1)+","+(l1-l0));
			return docValues.maxtm;
		

	}

}
