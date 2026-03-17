import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import { postContact } from "../api/movieseries";
import useMovieSeries from "../hooks/useMovieSeries";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";
import type { ContactFormData, ApiResponse, ContactUsType } from "../types";

const initialState: ContactFormData = { name: "", message: "" };

const ContactUs = () => {

    const { filters, updateFilter } = useFilters();

    const { contactUs, handleContactUs } = useMovieSeries() as {
        contactUs: ContactUsType[];
        handleContactUs: () => void;
    };

    const [formData, setFormData] = useState<ContactFormData>(initialState);
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response: ApiResponse = await postContact(formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                setFormData(initialState);
            };
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("Server busy. Try again later.");
        } finally {
            setLoading(false);
        };
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        handleContactUs();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Information />

            <div className="container mt-3 mb-3">
                <div className="bg-dark p-3 rounded">
                    <h3 className="text-center text-danger fw-bold">
                        ::::: Query :::::
                    </h3>
                    <hr className="border-secondary" />
                    <form onSubmit={handleOnSubmit}>
                        <div className="d-flex align-items-center">
                            <div className="avatar-circle me-2">
                                <i className="fas fa-user text-secondary"></i>
                            </div>
                            <div className="input-group custom-group">
                                <input
                                    type="text"
                                    className="form-control custom-input name-input"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="text"
                                    className="form-control custom-input message-input"
                                    placeholder="Comment the movies & web series..."
                                    name="message"
                                    value={formData.message}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    {loading ? "..." : "Post"}
                                </button>
                            </div>
                        </div>
                    </form>
                    <hr className="border-secondary" />
                    <div className="mt-4">
                        {contactUs.map((contact) => (
                            <div className="mb-4" key={contact._id}>
                                <div className="d-flex gap-3">
                                    <div className="avatar-circle">
                                        <i className="fas fa-user text-secondary"></i>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold text-primary">{contact.name}</span>
                                            <small className="text-muted">
                                                <i className="far fa-clock me-1"></i>{moment(contact.createdAt).fromNow()}
                                            </small>
                                        </div>
                                        <p className="mb-1 text-danger">{contact.message}</p>
                                        <small className="text-secondary cp">
                                            <i className="fas fa-reply me-1"></i> Reply
                                        </small>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 mt-3 ms-5 border-start ps-3 border-secondary">
                                    <div className="avatar-circle-sm">
                                        <i className="fas fa-user-shield text-success"></i>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold text-info">Admin</span>
                                            <small className="text-muted">
                                                <i className="far fa-clock me-1"></i>{moment(contact.updatedAt).fromNow()}
                                            </small>
                                        </div>
                                        <p className="mb-1 text-light">
                                            <i>
                                                {contact.status === "resolved" ? "Query Resolved" : "Awaiting Response"}
                                            </i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;