export const exercises = [
  ['Push-Up','Chest',['Chest','Triceps'],'bodyweight','beginner','push',3,10,45],['Incline Push-Up','Chest',['Chest','Triceps'],'bodyweight','beginner','push',3,12,45],['Dumbbell Bench Press','Chest',['Chest','Triceps'],'dumbbells','intermediate','push',3,10,60],['Dumbbell Floor Press','Chest',['Chest','Triceps'],'dumbbells','beginner','push',3,10,60],['Dumbbell Row','Back',['Back','Biceps'],'dumbbells','beginner','pull',3,10,60],['Resistance Band Row','Back',['Back','Biceps'],'bands','beginner','pull',3,12,45],['Inverted Row','Back',['Back','Biceps'],'home gym','intermediate','pull',3,8,60],['Lat Pulldown','Back',['Back','Biceps'],'full gym','beginner','pull',3,10,60],['Pike Push-Up','Shoulders',['Shoulders','Triceps'],'bodyweight','intermediate','push',3,8,60],['Dumbbell Shoulder Press','Shoulders',['Shoulders','Triceps'],'dumbbells','beginner','push',3,10,60],['Dumbbell Lateral Raise','Shoulders',['Shoulders'],'dumbbells','beginner','isolation',3,12,45],['Band Shoulder Press','Shoulders',['Shoulders'],'bands','beginner','push',3,12,45],['Dumbbell Curl','Arms',['Biceps'],'dumbbells','beginner','isolation',3,10,45],['Hammer Curl','Arms',['Biceps','Forearms'],'dumbbells','beginner','isolation',3,10,45],['Tricep Extension','Arms',['Triceps'],'dumbbells','beginner','isolation',3,10,45],['Bench/Chair Tricep Dip','Arms',['Triceps'],'home gym','beginner','push',3,10,45],['Bodyweight Squat','Legs',['Quads','Glutes'],'bodyweight','beginner','squat',3,12,45],['Goblet Squat','Legs',['Quads','Glutes','Core'],'dumbbells','beginner','squat',3,10,60],['Reverse Lunge','Legs',['Quads','Glutes'],'bodyweight','beginner','lunge',3,10,45],['Walking Lunge','Legs',['Quads','Glutes'],'bodyweight','intermediate','lunge',3,12,60],['Bulgarian Split Squat','Legs',['Quads','Glutes'],'dumbbells','advanced','lunge',3,8,75],['Romanian Deadlift','Legs',['Hamstrings','Glutes'],'bodyweight','intermediate','hinge',3,10,60],['Dumbbell Romanian Deadlift','Legs',['Hamstrings','Glutes'],'dumbbells','beginner','hinge',3,10,60],['Glute Bridge','Legs',['Glutes','Hamstrings'],'bodyweight','beginner','hinge',3,15,45],['Calf Raise','Legs',['Calves'],'bodyweight','beginner','isolation',3,15,30],['Plank','Core',['Core'],'bodyweight','beginner','core',3,30,30,true],['Side Plank','Core',['Core'],'bodyweight','beginner','core',3,20,30,true],['Dead Bug','Core',['Core'],'bodyweight','beginner','core',3,10,30],['Mountain Climbers','Core',['Core','Shoulders'],'bodyweight','beginner','cardio',3,30,30,true],['Bicycle Crunch','Core',['Core'],'bodyweight','beginner','core',3,15,30],['Leg Raise','Core',['Core'],'bodyweight','intermediate','core',3,10,45],['Burpee','Full body',['Full Body','Cardio'],'bodyweight','intermediate','cardio',3,8,45],['Dumbbell Thruster','Full body',['Legs','Shoulders'],'dumbbells','intermediate','compound',3,10,60],['Dumbbell Clean','Full body',['Legs','Shoulders'],'dumbbells','advanced','compound',3,8,75],['Kettlebell Swing','Full body',['Glutes','Hamstrings'],'home gym','intermediate','hinge',3,15,60],['Squat to Press','Full body',['Legs','Shoulders'],'dumbbells','beginner','compound',3,10,60],['Jumping Jacks','Cardio',['Cardio'],'bodyweight','beginner','cardio',3,40,30,true],['High Knees','Cardio',['Cardio'],'bodyweight','beginner','cardio',3,30,30,true],['March in Place','Cardio',['Cardio'],'bodyweight','beginner','cardio',3,45,30,true],].map((e,i)=>({id:i+1,name:e[0],category:e[1],muscles:e[2],equipment:e[3],difficulty:e[4],movement:e[5],defaultSets:e[6],defaultReps:e[7],defaultRest:e[8],timeBased:e[9]||false}))

export const equipmentLabel = { bodyweight:'No Equipment', dumbbells:'Dumbbells', bands:'Resistance Bands', 'home gym':'Home Gym', 'full gym':'Full Gym' }
export const compatible = (exercise, equipment) => equipment === 'full gym' || exercise.equipment === 'bodyweight' || exercise.equipment === equipment || (equipment === 'home gym' && ['dumbbells','bands','home gym'].includes(exercise.equipment))
export const goalLabel = { muscle:'Build Muscle', strength:'Get Stronger', fat:'Lose Fat', fitness:'General Fitness' }
export const focusLabel = { full:'Full Body', upper:'Upper Body', lower:'Lower Body', chest:'Chest', back:'Back', shoulders:'Shoulders', arms:'Arms', core:'Core', legs:'Legs' }
export const focusCategories = { full:['Full body','Chest','Back','Legs','Core'], upper:['Chest','Back','Shoulders','Arms'], lower:['Legs','Core'], chest:['Chest'], back:['Back'], shoulders:['Shoulders'], arms:['Arms'], core:['Core'], legs:['Legs'] }
export function generateWorkout({goal='fitness',time=30,equipment='dumbbells',experience='beginner',focus='full'}) { const count=time<=10?4:time<=15?4:time<=20?5:time<=30?6:time<=45?8:10; const allowed=exercises.filter(e=>compatible(e,equipment)&&focusCategories[focus].includes(e.category)); const fallback=exercises.filter(e=>compatible(e,equipment)); const pool=allowed.length>=count?allowed:fallback; const sorted=[...pool].sort((a,b)=>(a.difficulty===experience? -1:1)-(b.difficulty===experience?-1:1)); const picked=[]; sorted.forEach(e=>{ if(picked.length<count && !picked.some(p=>p.movement===e.movement && p.category===e.category)) picked.push(e) }); let i=0; while(picked.length<count) picked.push(sorted[i++%sorted.length]); const volume=goal==='strength'?4:goal==='muscle'?3:2; return {id:Date.now(),goal,time,equipment,experience,focus,name:`${time}-Minute ${focusLabel[focus]} Workout`,intensity:goal==='strength'?'Challenging':goal==='fat'?'High energy':'Moderate',exercises:picked.map(e=>({...e,defaultSets:Math.max(2,volume),defaultReps:goal==='strength'?6:goal==='muscle'?10:e.defaultReps}))} }
export function swapExercise(current, workout){ return exercises.find(e=>compatible(e,workout.equipment)&&e.category===current.category&&e.id!==current.id) || current }
export const exerciseFrom = (e) => e

export const options = { goals:[['muscle','Build Muscle'],['strength','Get Stronger'],['fat','Lose Fat'],['fitness','General Fitness']], times:[10,15,20,30,45,60], equipment:[['bodyweight','No Equipment'],['dumbbells','Dumbbells'],['bands','Resistance Bands'],['home gym','Home Gym'],['full gym','Full Gym']], experience:[['beginner','Beginner'],['intermediate','Intermediate'],['advanced','Advanced']], focuses:Object.entries(focusLabel) }
export const labelForEquipment=(e)=>equipmentLabel[e]||e
export const labelForGoal=(e)=>goalLabel[e]||e
export const labelForFocus=(e)=>focusLabel[e]||e
export const timeEstimate=(workout)=>workout.time
export const intensityValue=(workout)=>workout.intensity==='Challenging'?82:workout.intensity==='High energy'?74:58
export const formatReps=(e)=>e.timeBased?`${e.defaultReps} sec`:`${e.defaultReps} reps`
export const categoryColor=(category)=>category==='Legs'?'#84cc16':category==='Core'?'#f59e0b':'#111827'
export const safeWorkout=(raw)=>raw
export const makeDemoWorkout=()=>generateWorkout({})
export const allExercises=exercises
export const focusName=focusLabel
export const goalName=goalLabel
export const equipmentName=equipmentLabel
export const experienceName={beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced'}
export const getIntensity=(w)=>intensityValue(w)
export const getRest=(e)=>e.defaultRest
export const getSets=(e)=>e.defaultSets
export const getReps=(e)=>e.defaultReps
export const getMuscles=(e)=>e.muscles
export const getName=(e)=>e.name
export const getDifficulty=(e)=>e.difficulty
export const getCategory=(e)=>e.category
export const getEquipment=(e)=>e.equipment
export const getMovement=(e)=>e.movement
export const isTimeBased=(e)=>e.timeBased
export const getWorkoutTitle=(w)=>w.name
export const getWorkoutExercises=(w)=>w.exercises
export const getWorkoutDuration=(w)=>w.time
export const getWorkoutCount=(w)=>w.exercises.length
export const getWorkoutGoal=(w)=>goalLabel[w.goal]
export const getWorkoutFocus=(w)=>focusLabel[w.focus]
export const getWorkoutEquipment=(w)=>equipmentLabel[w.equipment]
export const getWorkoutExperience=(w)=>experienceName[w.experience]
export const getWorkoutIntensity=(w)=>w.intensity
export const getExerciseById=(id)=>exercises.find(e=>e.id===id)
export const getCompatibleExercises=(equipment)=>exercises.filter(e=>compatible(e,equipment))
export const getCategoryExercises=(category,equipment)=>exercises.filter(e=>e.category===category&&compatible(e,equipment))
export const getGoalOptions=()=>options.goals
export const getTimeOptions=()=>options.times
export const getEquipmentOptions=()=>options.equipment
export const getExperienceOptions=()=>options.experience
export const getFocusOptions=()=>options.focuses
export const generate=generateWorkout
export const swap=swapExercise
export default exercises

// The named fields above keep the data layer easy to extend into future programs and premium generators.

