import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function RadioG({answers, correctAnswer, reset, onWin}: {answers: string[], correctAnswer: string, reset: () => void, onWin: () => void}) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const correct = correctAnswer === (event.target as HTMLInputElement).value
        if(correct) {
            onWin()
        }
    }
    return <FormControl>
    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
    >   
        {
            answers.map((answer, i) => {
                return <FormControlLabel key={i} value={answer} control={<Radio />} label={answer} />
            })
        }
    </RadioGroup>
    </FormControl>
}

