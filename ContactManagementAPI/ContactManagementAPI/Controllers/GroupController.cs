using ContactManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactManagementAPI.Controllers
{
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly ContactManagementContext _context;

        public GroupController(ContactManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[controller]/{id}")]
        public IActionResult GetId(int id)
        {
            return Ok(_context.Groups.Find(id));
        }

        [HttpGet]
        [Route("[controller]/list")]
        public IActionResult GetGroups()
        {
            return Ok(_context.Groups);
        }

        [HttpDelete]
        [Route("[controller]/delete")]
        public IActionResult DeleteGroup(int id)
        {
            var group = GetGroup(id);

            // if group actually exists then delete it
            if (group != null)
            {
                _context.Remove(group);
            }

            // save changes
            _context.SaveChanges();

            return Ok(id);
        }

        [HttpPost]
        [Route("[controller]/add")]
        public IActionResult AddGroup([FromBody] Group group)
        {
            // add group
            _context.Groups.Add(group);
            _context.SaveChanges();

            return CreatedAtAction(nameof(AddGroup), group);
        }

        [HttpPut]
        [Route("[controller]/update")]
        public IActionResult UpdateGroup([FromBody] Group updatedGroup)
        {
            var group = GetGroup(updatedGroup.Id);

            // if group actually exists then delete it
            if (group != null)
            {
                if (!string.IsNullOrEmpty(updatedGroup.Title))
                {
                    group.Title = updatedGroup.Title;
                }
                if (!string.IsNullOrEmpty(updatedGroup.Description))
                {
                    group.Description = updatedGroup.Description;
                }

                // save changes
                _context.SaveChanges();

                return Ok(group);
            }

            // group not found return no content
            return NoContent();
        }

        private Group GetGroup(int id)
        {
            return (from g in _context.Groups
                    where g.Id == id
                    select g).FirstOrDefault();
        }
    }
}
