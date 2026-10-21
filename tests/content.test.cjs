const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync('assets/content.js','utf8')+'\n'+fs.readFileSync('assets/questions.js','utf8')+'\nglobalThis.data={SUBJECTS,QUESTIONS,ESSAY_THEMES};',ctx);
const {SUBJECTS,QUESTIONS,ESSAY_THEMES}=ctx.data;
test('distribuição exata das 60 questões conforme Tabela 8.1',()=>{
  const expected={constitucional:8,penal:6,processual:6,militar:6,especial:6,transito:5,institucional:10,portugues:8,informatica:5};
  assert.equal(QUESTIONS.length,60);
  assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,60);
  for(const [id,count] of Object.entries(expected)){
    assert.equal(SUBJECTS.find(s=>s.id===id).count,count);
    assert.equal(QUESTIONS.filter(q=>q.subject===id).length,count);
  }
});
test('cada questão tem 5 alternativas distintas e explicação',()=>{
 for(const q of QUESTIONS){assert.equal(q.options.length,5,q.id);assert.equal(new Set(q.options).size,5,q.id);assert.equal(q.correct,0);assert.ok(q.explanation.length>60,q.id);}
});
test('todas as disciplinas têm revisões e fonte oficial HTTPS',()=>{
 for(const s of SUBJECTS){assert.ok(s.topics.length>=5);assert.ok(s.url.startsWith('https://'));for(const t of s.topics){assert.equal(t.length,4);assert.ok(t.slice(1).every(x=>x.length>80),t[0]);}}
 assert.equal(ESSAY_THEMES.length,6);
});
test('transcrição inclui todas as disciplinas e recortes legais',()=>{
 const {text}=JSON.parse(fs.readFileSync('assets/programa.json','utf8'));
 for(const value of ['Direito Constitucional','Direito Penal Comum','Direito Processual Penal Comum','Direito Penal Militar','Legislação Especial','Legislação de Trânsito','Legislação Institucional','Língua Portuguesa','Informática','Ordem Pública','109-c','312- B','765','801'])assert.ok(text.includes(value),value);
 assert.ok(fs.statSync('assets/edital-pmsc-2026.pdf').size>4000000);
});
