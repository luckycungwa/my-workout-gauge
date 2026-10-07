export type ExerciseMedia = { type: 'image' | 'gif' | 'video' | 'none'; src?: string; alt?: string }
export type Exercise = {
  id: string; name: string; slug: string; category: string; movement: string; muscles: string[]
  primaryMuscles: string[]; secondaryMuscles: string[]; equipment: string; difficulty: 'beginner' | 'intermediate' | 'advanced'
  location: string[]; instructions: string[]; formCues: string[]; commonMistakes: string[]; alternatives: string[]
  progression?: string; regression?: string; defaultSets: number; defaultReps: number; defaultRest: number; timeBased?: boolean; media: ExerciseMedia
}
const make = (id: string, name: string, category: string, muscles: string[], equipment: string, difficulty: Exercise['difficulty'], movement: string, reps = 10): Exercise => ({
  id, name, slug: id, category, movement, muscles, primaryMuscles: muscles.slice(0, 1), secondaryMuscles: muscles.slice(1), equipment, difficulty,
  location: equipment === 'full gym' ? ['gym'] : ['home', 'gym'], instructions: [`Set up for ${name.toLowerCase()} with a stable, controlled position.`, 'Move through a comfortable range of motion and return with control.'],
  formCues: ['Brace your core', 'Keep the movement smooth', 'Stop if sharp pain occurs'], commonMistakes: ['Rushing the eccentric phase', 'Losing a neutral spine'], alternatives: [], defaultSets: 3, defaultReps: reps, defaultRest: equipment === 'bodyweight' ? 45 : 60, media: { type: 'none' }
})
export const exercises: Exercise[] = [
  make('push-up','Push-Up','Chest',['Chest','Triceps'],'bodyweight','beginner','push',12), make('incline-push-up','Incline Push-Up','Chest',['Chest','Triceps'],'bodyweight','beginner','push',12), make('pike-push-up','Pike Push-Up','Shoulders',['Shoulders','Triceps'],'bodyweight','intermediate','push',8), make('diamond-push-up','Diamond Push-Up','Arms',['Triceps','Chest'],'bodyweight','intermediate','push',10), make('pull-up','Pull-Up','Back',['Back','Biceps'],'bodyweight','advanced','pull',6), make('chin-up','Chin-Up','Back',['Back','Biceps'],'bodyweight','intermediate','pull',6), make('bodyweight-squat','Bodyweight Squat','Legs',['Quads','Glutes'],'bodyweight','beginner','squat',15), make('reverse-lunge','Reverse Lunge','Legs',['Quads','Glutes'],'bodyweight','beginner','lunge',10), make('bulgarian-split-squat','Bulgarian Split Squat','Legs',['Quads','Glutes'],'bodyweight','advanced','lunge',8), make('glute-bridge','Glute Bridge','Glutes',['Glutes','Hamstrings'],'bodyweight','beginner','hinge',15), make('plank','Plank','Core',['Core'],'bodyweight','beginner','brace',30), make('mountain-climber','Mountain Climber','Conditioning',['Core','Shoulders'],'bodyweight','beginner','conditioning',30),
  make('dumbbell-bench-press','Dumbbell Bench Press','Chest',['Chest','Triceps'],'dumbbells','intermediate','push',10), make('dumbbell-floor-press','Dumbbell Floor Press','Chest',['Chest','Triceps'],'dumbbells','beginner','push',10), make('dumbbell-row','Dumbbell Row','Back',['Back','Biceps'],'dumbbells','beginner','pull',10), make('dumbbell-shoulder-press','Dumbbell Shoulder Press','Shoulders',['Shoulders','Triceps'],'dumbbells','beginner','push',10), make('dumbbell-lateral-raise','Dumbbell Lateral Raise','Shoulders',['Shoulders'],'dumbbells','beginner','isolation',12), make('dumbbell-curl','Dumbbell Curl','Arms',['Biceps'],'dumbbells','beginner','isolation',10), make('hammer-curl','Hammer Curl','Arms',['Biceps','Forearms'],'dumbbells','beginner','isolation',10), make('goblet-squat','Goblet Squat','Legs',['Quads','Glutes','Core'],'dumbbells','beginner','squat',10), make('dumbbell-rdl','Dumbbell Romanian Deadlift','Legs',['Hamstrings','Glutes'],'dumbbells','beginner','hinge',10), make('farmer-carry','Farmer Carry','Conditioning',['Traps','Core'],'dumbbells','beginner','carry',30),
  make('barbell-back-squat','Barbell Back Squat','Legs',['Quads','Glutes'],'barbell','intermediate','squat',6), make('barbell-deadlift','Barbell Deadlift','Back',['Hamstrings','Glutes','Back'],'barbell','advanced','hinge',5), make('barbell-bench-press','Barbell Bench Press','Chest',['Chest','Triceps'],'barbell','intermediate','push',6), make('overhead-press','Overhead Press','Shoulders',['Shoulders','Triceps'],'barbell','intermediate','push',6), make('barbell-row','Barbell Row','Back',['Back','Biceps'],'barbell','intermediate','pull',8),
  make('lat-pulldown','Lat Pulldown','Back',['Back','Biceps'],'full gym','beginner','pull',10), make('cable-row','Cable Row','Back',['Back','Biceps'],'full gym','beginner','pull',10), make('chest-press','Machine Chest Press','Chest',['Chest','Triceps'],'full gym','beginner','push',10), make('leg-press','Leg Press','Legs',['Quads','Glutes'],'full gym','beginner','squat',10), make('leg-curl','Leg Curl','Legs',['Hamstrings'],'full gym','beginner','isolation',12), make('cable-curl','Cable Curl','Arms',['Biceps'],'full gym','beginner','isolation',12)
]
export const allExercises = exercises
export const equipmentLabel: Record<string,string> = { bodyweight:'No Equipment', dumbbells:'Dumbbells', bands:'Resistance Bands', 'home gym':'Home Gym', 'full gym':'Full Gym', barbell:'Barbell' }
export const goalLabel: Record<string,string> = { muscle:'Build Muscle', strength:'Get Stronger', fat:'Lose Fat', fitness:'General Fitness' }
export const focusLabel: Record<string,string> = { full:'Full Body', upper:'Upper Body', lower:'Lower Body', chest:'Chest', back:'Back', shoulders:'Shoulders', arms:'Arms', core:'Core', legs:'Legs' }
export const experienceName: Record<Exercise['difficulty'], string> = { beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced' }
export const compatible = (e: Exercise, equipment: string) => equipment === 'full gym' || e.equipment === 'bodyweight' || e.equipment === equipment || (equipment === 'home gym' && ['dumbbells','barbell'].includes(e.equipment))
const focusCategories: Record<string,string[]> = { full:['Chest','Back','Legs','Core','Shoulders','Arms','Glutes','Conditioning'], upper:['Chest','Back','Shoulders','Arms'], lower:['Legs','Glutes'], chest:['Chest'], back:['Back'], shoulders:['Shoulders'], arms:['Arms'], core:['Core'], legs:['Legs'] }
export const options = { goals:[['muscle','Build Muscle'],['strength','Get Stronger'],['fat','Lose Fat'],['fitness','General Fitness']], times:[10,15,20,30,45,60], equipment:[['bodyweight','No Equipment'],['dumbbells','Dumbbells'],['home gym','Home Gym'],['full gym','Full Gym'],['barbell','Barbell'],['mixed','Mixed']], experience:[['beginner','Beginner'],['intermediate','Intermediate'],['advanced','Advanced']], focuses:Object.entries(focusLabel) }
export function generateWorkout({ goal='fitness', time=30, equipment='dumbbells', experience='beginner', focus='full' } = {}) { const count = time <= 10 ? 4 : time <= 20 ? 5 : time <= 30 ? 6 : time <= 45 ? 8 : 10; const eq = equipment === 'mixed' ? 'full gym' : equipment; const pool = exercises.filter(e => compatible(e, eq) && focusCategories[focus]?.includes(e.category)); const fallback = exercises.filter(e => compatible(e, eq)); const source = (pool.length >= count ? pool : fallback).slice(); const picked: Exercise[] = []; for (const e of source.sort((a,b) => Number(b.difficulty === experience) - Number(a.difficulty === experience))) { if (picked.length >= count) break; if (!picked.some(p => p.movement === e.movement)) picked.push(e) } while (picked.length < count && source.length) picked.push(source[picked.length % source.length]); const sets = goal === 'strength' ? 4 : goal === 'muscle' ? 3 : 2; return { id: Date.now(), goal, time, equipment, experience, focus, name: `${time}-Minute ${focusLabel[focus]} Workout`, intensity: goal === 'strength' ? 'Challenging' : goal === 'fat' ? 'High energy' : 'Moderate', exercises: picked.map(e => ({ ...e, defaultSets: Math.max(2, sets), defaultReps: goal === 'strength' ? 6 : e.defaultReps })) } }
export const swapExercise = (current: Exercise, workout: { equipment: string }) => exercises.find(e => compatible(e, workout.equipment) && e.category === current.category && e.id !== current.id) || current
export const formatReps = (e: Exercise) => e.timeBased ? `${e.defaultReps} sec` : `${e.defaultReps} reps`
export const intensityValue = (w: { intensity: string }) => w.intensity === 'Challenging' ? 82 : w.intensity === 'High energy' ? 74 : 58
export const getExerciseBySlug = (slug: string) => exercises.find(e => e.slug === slug)
export const labelForEquipment = (e: string) => equipmentLabel[e] || e
export const labelForGoal = (e: string) => goalLabel[e] || e
export const labelForFocus = (e: string) => focusLabel[e] || e
export const focusName = focusLabel; export const goalName = goalLabel; export const equipmentName = equipmentLabel
export default exercises
export const generate = generateWorkout; export const swap = swapExercise

// A single typed dataset powers the library, generator, and active workout views.
// Exercise media is optional so verified demonstrations can be added later without broken links.
export type WorkoutExercise = Exercise
export type Workout = ReturnType<typeof generateWorkout>
export type WorkoutPreferences = Parameters<typeof generateWorkout>[0]
export type WorkoutHistoryEntry = Workout & { completedAt: string }
export type TimerState = 'ready' | 'resting' | 'paused' | 'complete'
export const exerciseFrom = (e: Exercise) => e
export const safeWorkout = (raw: Workout) => raw
export const makeDemoWorkout = () => generateWorkout({})
export const timeEstimate = (w: Workout) => w.time
export const getRest = (e: Exercise) => e.defaultRest
export const getSets = (e: Exercise) => e.defaultSets
export const getReps = (e: Exercise) => e.defaultReps
export const getMuscles = (e: Exercise) => e.muscles
export const getName = (e: Exercise) => e.name
export const getDifficulty = (e: Exercise) => e.difficulty
export const getCategory = (e: Exercise) => e.category
export const getEquipment = (e: Exercise) => e.equipment
export const getMovement = (e: Exercise) => e.movement
export const isTimeBased = (e: Exercise) => e.timeBased
export const getWorkoutTitle = (w: Workout) => w.name
export const getWorkoutExercises = (w: Workout) => w.exercises
export const getWorkoutDuration = (w: Workout) => w.time
export const getWorkoutCount = (w: Workout) => w.exercises.length
export const getWorkoutGoal = (w: Workout) => goalLabel[w.goal]
export const getWorkoutFocus = (w: Workout) => focusLabel[w.focus]
export const getWorkoutEquipment = (w: Workout) => equipmentLabel[w.equipment]
export const getWorkoutExperience = (w: Workout) => experienceName[w.experience as Exercise['difficulty']]
export const getWorkoutIntensity = (w: Workout) => w.intensity
export const getExerciseById = (id: string) => exercises.find(e => e.id === id)
export const getCompatibleExercises = (equipment: string) => exercises.filter(e => compatible(e, equipment))
export const getCategoryExercises = (category: string, equipment: string) => exercises.filter(e => e.category === category && compatible(e, equipment))
export const getGoalOptions = () => options.goals; export const getTimeOptions = () => options.times; export const getEquipmentOptions = () => options.equipment; export const getExperienceOptions = () => options.experience; export const getFocusOptions = () => options.focuses
export const categoryColor = (category: string) => category === 'Legs' ? '#84cc16' : category === 'Core' ? '#f59e0b' : '#111827'
export const getIntensity = intensityValue

// Backwards-compatible aliases used by the original prototype.
export const labelFor = labelForFocus
export const getWorkoutName = getWorkoutTitle
export const getExerciseName = getName
export const getExerciseCategory = getCategory
export const getExerciseEquipment = getEquipment
export const getExerciseDifficulty = getDifficulty
export const getExerciseMovement = getMovement
export const getExerciseMuscles = getMuscles
export const getExerciseReps = getReps
export const getExerciseSets = getSets
export const getExerciseRest = getRest
export const getExerciseId = (e: Exercise) => e.id
export const getExerciseSlug = (e: Exercise) => e.slug
export const getExerciseInstructions = (e: Exercise) => e.instructions
export const getExerciseFormCues = (e: Exercise) => e.formCues
export const getExerciseMistakes = (e: Exercise) => e.commonMistakes
export const getExerciseAlternatives = (e: Exercise) => e.alternatives
export const getExerciseMedia = (e: Exercise) => e.media
export const getExercisePrimaryMuscles = (e: Exercise) => e.primaryMuscles
export const getExerciseSecondaryMuscles = (e: Exercise) => e.secondaryMuscles
export const getExerciseLocation = (e: Exercise) => e.location
export const getExerciseProgression = (e: Exercise) => e.progression
export const getExerciseRegression = (e: Exercise) => e.regression
export const getExerciseDefaultSets = getSets
export const getExerciseDefaultReps = getReps
export const getExerciseDefaultRest = getRest
export const getExerciseTimeBased = isTimeBased
export const getExercise = getExerciseBySlug
export const getExercises = () => exercises
export const searchExercises = (q: string) => exercises.filter(e => `${e.name} ${e.category} ${e.muscles.join(' ')}`.toLowerCase().includes(q.toLowerCase()))
export const filterExercises = (filters: { muscle?: string; equipment?: string; difficulty?: string; category?: string }) => exercises.filter(e => (!filters.muscle || e.muscles.includes(filters.muscle)) && (!filters.equipment || e.equipment === filters.equipment) && (!filters.difficulty || e.difficulty === filters.difficulty) && (!filters.category || e.category === filters.category))
export const allMuscles = [...new Set(exercises.flatMap(e => e.muscles))].sort()
export const allCategories = [...new Set(exercises.map(e => e.category))].sort()
export const allEquipment = [...new Set(exercises.map(e => e.equipment))].sort()
export const allDifficulties = ['beginner','intermediate','advanced']
export const allMovements = [...new Set(exercises.map(e => e.movement))].sort()
export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
export const findExercise = getExerciseBySlug
export const exerciseCount = exercises.length
export const workoutSchemaVersion = 2
export const defaultRestOptions = [30,45,60,90,120]
export const defaultWorkoutPreferences: WorkoutPreferences = { goal:'fitness', time:30, equipment:'dumbbells', experience:'beginner', focus:'full' }
export const isExercise = (value: unknown): value is Exercise => Boolean(value && typeof value === 'object' && 'slug' in value && 'name' in value)
export const isWorkout = (value: unknown): value is Workout => Boolean(value && typeof value === 'object' && 'exercises' in value && 'name' in value)
export const getWorkoutSummary = (w: Workout) => `${w.time} minutes · ${w.exercises.length} exercises · ${goalLabel[w.goal]}`
export const getExerciseSummary = (e: Exercise) => `${e.category} · ${equipmentLabel[e.equipment] || e.equipment} · ${experienceName[e.difficulty]}`
export const getEquipmentChoices = () => options.equipment
export const getFocusChoices = () => options.focuses
export const getGoalChoices = () => options.goals
export const getExperienceChoices = () => options.experience
export const getTimeChoices = () => options.times
export const getExerciseChoices = () => exercises.map(e => [e.slug,e.name] as const)
export const getLibraryStats = () => ({ count: exercises.length, categories: allCategories.length, muscles: allMuscles.length })
export const getWorkoutDifficulty = (w: Workout) => w.experience
export const getWorkoutMuscles = (w: Workout) => [...new Set(w.exercises.flatMap(e => e.muscles))]
export const getWorkoutDate = (w: Workout) => new Date(w.id)
export const getWorkoutRest = (w: Workout) => Math.round(w.exercises.reduce((sum,e) => sum + e.defaultRest, 0) / Math.max(w.exercises.length,1))
export const getWorkoutSets = (w: Workout) => w.exercises.reduce((sum,e) => sum + e.defaultSets, 0)
export const getWorkoutReps = (w: Workout) => w.exercises.reduce((sum,e) => sum + e.defaultReps, 0)
export const normalizeEquipment = (value: string) => value === 'none' ? 'bodyweight' : value
export const normalizeDifficulty = (value: string): Exercise['difficulty'] => ['beginner','intermediate','advanced'].includes(value) ? value as Exercise['difficulty'] : 'beginner'
export const normalizeFocus = (value: string) => focusLabel[value] ? value : 'full'
export const normalizeGoal = (value: string) => goalLabel[value] ? value : 'fitness'
export const normalizeTime = (value: number) => [10,15,20,30,45,60].includes(value) ? value : 30
export const normalizePreferences = (prefs?: Partial<WorkoutPreferences>): WorkoutPreferences => ({ ...defaultWorkoutPreferences, ...prefs, time: normalizeTime(Number(prefs?.time ?? 30)), goal: normalizeGoal(String(prefs?.goal ?? 'fitness')), focus: normalizeFocus(String(prefs?.focus ?? 'full')), equipment: normalizeEquipment(String(prefs?.equipment ?? 'dumbbells')), experience: normalizeDifficulty(String(prefs?.experience ?? 'beginner')) })
export const generateFromPreferences = (prefs?: Partial<WorkoutPreferences>) => generateWorkout(normalizePreferences(prefs))
export const getMediaLabel = (e: Exercise) => e.media.type === 'none' ? 'Demonstration coming soon' : 'Exercise demonstration'
export const hasMedia = (e: Exercise) => e.media.type !== 'none' && Boolean(e.media.src)
export const version = '2.0.0'
export const datasetName = 'Workout Gauge Exercise Library'
export const datasetLicense = 'Original instructional content'
export const datasetSource = 'Workout Gauge'
export const datasetUpdated = '2026-10-07'
export const datasetNotes = 'No third-party media is bundled.'
export const getDatasetMeta = () => ({ name: datasetName, version, count: exercises.length, updated: datasetUpdated })
export const getExerciseSlugs = () => exercises.map(e => e.slug)
export const getExerciseNames = () => exercises.map(e => e.name)
export const getExercisesByCategory = (category: string) => exercises.filter(e => e.category === category)
export const getExercisesByMuscle = (muscle: string) => exercises.filter(e => e.muscles.includes(muscle))
export const getExercisesByDifficulty = (difficulty: string) => exercises.filter(e => e.difficulty === difficulty)
export const getExercisesByEquipment = (equipment: string) => exercises.filter(e => e.equipment === equipment)
export const sortExercises = (items: Exercise[], sort: 'name' | 'difficulty' = 'name') => [...items].sort((a,b) => sort === 'name' ? a.name.localeCompare(b.name) : a.difficulty.localeCompare(b.difficulty))
export const getAlternatives = (e: Exercise) => exercises.filter(candidate => candidate.category === e.category && candidate.id !== e.id).slice(0,3)
export const withAlternatives = (e: Exercise) => ({ ...e, alternatives: e.alternatives.length ? e.alternatives : getAlternatives(e).map(a => a.name) })
export const exerciseDetail = (slug: string) => { const e = getExerciseBySlug(slug); return e ? withAlternatives(e) : undefined }
export const getExerciseDetail = exerciseDetail
export const canSwap = (current: Exercise, next: Exercise, equipment: string) => current.category === next.category && compatible(next, equipment)
export const swapOptions = (current: Exercise, equipment: string) => exercises.filter(e => canSwap(current,e,equipment))
export const generateReplacement = (current: Exercise, workout: Workout) => swapOptions(current, workout.equipment).find(e => e.id !== current.id) || current
export const isCompatible = compatible
export const getCompatible = getCompatibleExercises
