using ContactManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactManagementAPI.Controllers
{
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactManagementContext _context;

        public ContactController(ContactManagementContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of contacts from the contact table.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[controller]/list")]
        public IActionResult GetContacts()
        {
            return Ok(_context.Contacts);
        }

        /// <summary>
        /// Deletes a contact that has the given <paramref name="id"/> if it exists.
        /// </summary>
        /// <param name="id">The id of the contact to delete.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("[controller]/delete")]
        public IActionResult DeleteContact(int id)
        {
            // get contact
            var contact = GetContact(id);

            // remove contact from db
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
            }

            // save changes
            _context.SaveChanges();

            return Ok(id);
        }

        /// <summary>
        /// Adds a contact to the database with the given <paramref name="name"/>, <paramref name="description"/>, 
        /// <paramref name="birthDate"/>, and <paramref name="group"/>.
        /// </summary>
        /// <param name="name">The name of the contact.</param>
        /// <param name="description">The descriptoin for the contact.</param>
        /// <param name="birthDate">The birth date of the contact.</param>
        /// <param name="group">The group that the contact belongs to.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[controller]/add")]
        public IActionResult AddContact([FromBody] Contact contact)
        {
            // add contact information to db
            _context.Contacts.Add(contact);
            _context.SaveChanges();

            return CreatedAtAction(nameof(AddContact), contact);
        }

        /// <summary>
        /// Updates the contact with the given <paramref name="name"/>, <paramref name="description"/>, 
        /// <paramref name="birthDate"/>, and <paramref name="group"/> for the contact with the given <paramref name="id"/>.
        /// </summary>
        /// <param name="id">The id of the contact to be updated.</param>
        /// <param name="name">The name of the contact.</param>
        /// <param name="description">The descriptoin for the contact.</param>
        /// <param name="birthDate">The birth date of the contact.</param>
        /// <param name="group">The group that the contact belongs to.</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[controller]/update")]
        public IActionResult UpdateContact([FromBody] Contact updatedContact)
        {
            // find contact
            var contact = GetContact(updatedContact.Id);

            // if contact exists
            if (contact != null)
            {
                var updated = false;

                // update if name isn't null or empty
                if (!string.IsNullOrEmpty(updatedContact.Name))
                {
                    contact.Name = updatedContact.Name;
                    updated |= true;
                }
                // update if description isn't null or empty
                if (!string.IsNullOrEmpty(updatedContact.Description))
                {
                    contact.Description = updatedContact.Description;
                    updated |= true;
                }
                // update birth date if it isn't default value
                if (updatedContact.BirthDate != default)
                {
                    contact.BirthDate = updatedContact.BirthDate;
                    updated |= true;
                }
                // update if group isn't 0
                if (updatedContact.Group != 0)
                {
                    contact.Group = updatedContact.Group;
                    updated |= true;
                }
                // update if flag isn't null or empty
                if (!string.IsNullOrEmpty(updatedContact.Flag))
                {
                    contact.Flag = updatedContact.Flag;
                    updated |= true;
                }

                // if the contact has been updated then update the updated timestamp
                if (updated)
                {
                    contact.Updated = DateTime.Now;
                }

                // save changes
                _context.SaveChanges();

                return Ok(contact);
            }

            // return no 204 if contact doesn't exist
            return NoContent();
        }

        private Contact GetContact(int id)
        {
            return (from c in _context.Contacts
                    where c.Id == id
                    select c).FirstOrDefault();
        }
    }
}
