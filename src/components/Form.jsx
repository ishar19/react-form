import { useState, useEffect, useRef } from "react";
import styles from "./Form.module.css";

const Form = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [skills, setSkills] = useState([]);
    const [active, setActive] = useState(false);
    const [header, setHeader] = useState(
        "Try it free 7 days then ₹180/mo. thereafter"
    );

    const handleInputChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSkillsChange = (event) => {
        const selectedSkill = event.target.value;
        if (selectedSkill && !skills.includes(selectedSkill)) {
            setSkills((prevSkills) => [...prevSkills, selectedSkill]);
            event.target.selectedIndex = 0;
        }
    };
    const handleRemoveSkill = (skillToRemove) => {
        setSkills((prevSkills) =>
            prevSkills.filter((skill) => skill !== skillToRemove)
        );
    };
    const isFormSubmit = () => {
        if (
            formValues.name &&
            formValues.email &&
            formValues.password &&
            skills.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    };

    const claimTrial = () => {
        setHeader("You have successfully subscribed to our plan");
        setFormValues({ name: "", email: "", password: "" });
        setSkills([]);
        setActive(false);
    };

    useEffect(() => {
        setActive(skills.length > 0 && isFormSubmit());
    }, [skills, formValues]);

    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>{header}</div>
            <form className={styles.formBody}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                />
                <select
                    required
                    name="skills"
                    className={styles.formSelect}
                    onChange={handleSkillsChange}
                    value={skills || ""}
                >
                    <option value="">Choose Skills</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                </select>

                {skills && (
                    <div className={styles.skills}>
                        {skills.map((skill) => {
                            return (
                                <div key={skill} className={styles.skillTag}>
                                    {skill} &nbsp;
                                    <span onClick={() => handleRemoveSkill(skill)}>X</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <button
                    type="submit"
                    onClick={() => claimTrial}
                    className={`${active ? styles.formButtonActive : styles.formButton}`}
                >
                    CLAIM YOUR FREE TRIAL
                </button>

                <div className={styles.disclaimer}>
                    By clicking the button you are agreeing to our{" "}
                    <span style={{ color: "red" }}>Terms and Services</span>
                </div>
            </form>
        </div>
    );
};

export default Form;
