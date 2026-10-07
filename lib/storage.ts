const keys = { last:'wg-last-workout', history:'wg-history', prefs:'wg-preferences' }
const read = (key, fallback) => { if(typeof window==='undefined') return fallback; try { return JSON.parse(window.localStorage.getItem(key)||'null') ?? fallback } catch { return fallback } }
const write = (key, value) => { try { window.localStorage.setItem(key, JSON.stringify(value)) } catch {} }
export const storage = { keys, getLast:()=>read(keys.last,null), setLast:(v)=>write(keys.last,v), getHistory:()=>read(keys.history,[]), setHistory:(v)=>write(keys.history,v), getPrefs:()=>read(keys.prefs,{}), setPrefs:(v)=>write(keys.prefs,v), addHistory:(v)=>{const history=read(keys.history,[]);write(keys.history,[v,...history].slice(0,30))}, removeHistory:(id)=>write(keys.history,read(keys.history,[]).filter(item=>item.id!==id)) }
export default storage

