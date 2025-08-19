import { useEffect } from "react";
import { Link } from "react-router";
import useMovieSeries from "../hooks/useMovieSeries";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";
import type { AboutUsType } from "../types";

const AboutUs = () => {

    const { aboutUs, handleAboutUs } = useMovieSeries() as {
        aboutUs: Partial<AboutUsType>;
        handleAboutUs: () => void;
    };

    const { filters, updateFilter } = useFilters();

    useEffect(() => {
        handleAboutUs();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Information />

            <div className="container mt-3 mb-3">
                <div className="bg-dark p-3 rounded">
                    <h2 className="text-danger fw-bold">About Us</h2>
                    <p className="lead">{aboutUs?.tagline}</p>
                    <hr className="border-secondary" />
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseHelloHood" aria-expanded="true" aria-controls="collapseHelloHood">
                                    {aboutUs?.name}
                                </button>
                            </h2>
                            <div id="collapseHelloHood" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">{aboutUs?.description}</div>
                            </div>
                        </div>
                        {Object.keys(aboutUs || {}).length > 0 && (
                            <>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProjects" aria-expanded="false" aria-controls="collapseProjects">
                                            Projects
                                        </button>
                                    </h2>
                                    <div id="collapseProjects" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {Object.entries(aboutUs?.projects || {}).map(
                                                ([key, project]) => (
                                                    <div key={key} className="mb-3">
                                                        <h5>
                                                            {key} <small>({project.type})</small>
                                                        </h5>
                                                        <p>{project.description}</p>
                                                        <ul>
                                                            {project.features.map((feature, i) => (
                                                                <li key={i}>{feature}</li>
                                                            ))}
                                                        </ul>
                                                        <Link to={project.github} target="_blank" rel="noreferrer">
                                                            {project.github}
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTechStack" aria-expanded="false" aria-controls="collapseTechStack">
                                            Tech Stack
                                        </button>
                                    </h2>
                                    <div id="collapseTechStack" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {Object.entries(aboutUs?.techStack || {}).map(
                                                ([section, stack]) => (
                                                    <div key={section}>
                                                        <strong>{section}:</strong> {stack.join(", ")}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRoles" aria-expanded="false" aria-controls="collapseRoles">
                                            Roles
                                        </button>
                                    </h2>
                                    <div id="collapseRoles" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {Object.entries(aboutUs?.roles || {}).map(
                                                ([role, desc]) => (
                                                    <li key={role}>
                                                        <strong>{role}:</strong> {desc}
                                                    </li>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {aboutUs?.dataHandling && (
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDataHandling" aria-expanded="false" aria-controls="collapseDataHandling">
                                                Data Handling
                                            </button>
                                        </h2>
                                        <div id="collapseDataHandling" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {Object.entries(aboutUs?.dataHandling).map(
                                                    ([key, value]) => (
                                                        <li key={key}>
                                                            <strong>{key}:</strong> {value}
                                                        </li>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <h4 className="mt-4">Contact</h4>
                    {Object.keys(aboutUs || {}).length > 0 && (
                        <ul>
                            {Object.entries(aboutUs?.contact || {}).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {value.startsWith("http") ? (
                                        <Link to={value} target="_blank" rel="noreferrer">{value}</Link>
                                    ) : (
                                        value
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default AboutUs;