import { useState } from "react";
import { toast } from "react-hot-toast";
import { postContactus } from "../api/movieseries";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";

const initialState = { name: "", email: "", mobile: "", message: "" };

const ContactUs = () => {

    const { filters, updateFilter } = useFilters();

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await postContactus(formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                setLoading(false);
                setFormData(initialState);
            };
        } catch (error) {
            if (error.status === 400) toast.error("Server busy. Try again later.");
            else toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Information />

            <div className="container mt-3 mb-3">
                <div className="bg-dark p-3 rounded">
                    <h2 className="text-danger fw-bold">Contact Us</h2>
                    <p className="lead">Fill this form for any query.</p>
                    <hr className="border-secondary" />
                    <form onSubmit={handleOnSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="name">Name</span>
                            <input type="text" className="form-control" placeholder="John Doe" id="name" name="name" value={formData.name} onChange={handleOnChange} required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="email">Email</span>
                            <input type="email" className="form-control" placeholder="johndoe@gmail.com" id="email" name="email" value={formData.email} onChange={handleOnChange} required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="mobile">Mobile Number</span>
                            <input type="number" className="form-control" placeholder="1234567890" id="mobile" name="mobile" value={formData.mobile} onChange={handleOnChange} required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="message">Message</span>
                            <textarea className="form-control" placeholder="message" rows={3} id="message" name="message" value={formData.message} onChange={handleOnChange} required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary">{loading ? "Contacting..." : "Submit"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactUs;