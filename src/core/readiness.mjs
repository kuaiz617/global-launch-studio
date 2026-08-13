export function readinessNotes(seller){
 const band=seller.readiness>=80?'high':seller.readiness>=65?'medium':'developing';
 return { band, score:seller.readiness, strengths:seller.strengths, gaps:seller.gaps, disclaimer:'Simulation score for education prioritization only; not an eligibility decision.' };
}
